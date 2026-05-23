import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BUSINESS_NUMBERS = ["+971568812699", "+971589966987"] as const;

const bookingSchema = z.object({
  name: z.string().trim().min(2).max(60),
  game_type: z.enum(["snooker", "pool"]),
  time_slot: z.string().trim().min(3).max(40),
  target_whatsapp: z.enum(BUSINESS_NUMBERS),
  customer_phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[+0-9 \-()]*$/)
    .optional()
    .or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;

async function sendWhatsApp(params: {
  to: string;
  name: string;
  game: string;
  time: string;
  phone?: string;
}): Promise<{ sent: boolean; error?: string }> {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const TWILIO_API_KEY = process.env.TWILIO_API_KEY;
  const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM; // e.g. "whatsapp:+14155238886"

  if (!LOVABLE_API_KEY || !TWILIO_API_KEY || !TWILIO_WHATSAPP_FROM) {
    return { sent: false, error: "Twilio not configured" };
  }

  const body = [
    `🎱 *New Akram Snooker Booking*`,
    `Name: ${params.name}`,
    `Game: ${params.game.toUpperCase()}`,
    `Time: ${params.time}`,
    params.phone ? `Phone: ${params.phone}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(
      "https://connector-gateway.lovable.dev/twilio/Messages.json",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": TWILIO_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: `whatsapp:${params.to}`,
          From: TWILIO_WHATSAPP_FROM,
          Body: body,
        }),
      },
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { sent: false, error: `Twilio ${res.status}: ${JSON.stringify(data).slice(0, 200)}` };
    }
    return { sent: true };
  } catch (e) {
    return { sent: false, error: (e as Error).message };
  }
}

// crude in-memory rate-limit: max 5 per minute per name
const recent: { name: string; at: number }[] = [];

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const now = Date.now();
    while (recent.length && now - recent[0].at > 60_000) recent.shift();
    const sameName = recent.filter((r) => r.name === data.name).length;
    if (sameName >= 5) {
      throw new Error("Too many booking attempts. Please wait a minute and try again.");
    }
    recent.push({ name: data.name, at: now });

    const wa = await sendWhatsApp({
      to: data.target_whatsapp,
      name: data.name,
      game: data.game_type,
      time: data.time_slot,
      phone: data.customer_phone || undefined,
    });

    const { error } = await supabaseAdmin.from("bookings").insert({
      name: data.name,
      game_type: data.game_type,
      time_slot: data.time_slot,
      target_whatsapp: data.target_whatsapp,
      customer_phone: data.customer_phone || null,
      whatsapp_sent: wa.sent,
      whatsapp_error: wa.error ?? null,
    });

    if (error) {
      console.error("Booking insert error:", error);
    }

    return {
      ok: true,
      whatsappSent: wa.sent,
      whatsappError: wa.error,
    };
  });
