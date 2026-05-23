import { createFileRoute } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Table — Akram Snooker, Dubai" },
      { name: "description", content: "Reserve a snooker or pool table at Akram Snooker, Dubai. Instant WhatsApp confirmation." },
      { property: "og:title", content: "Book a Table at Akram Snooker" },
      { property: "og:description", content: "Pick your game and time — we'll get your booking instantly." },
    ],
  }),
  component: Book,
});

const NUMBERS = [
  { value: "+971568812699", label: "+971 56 881 2699" },
  { value: "+971589966987", label: "+971 58 996 6987" },
] as const;

function buildSlots(): string[] {
  // Hourly slots starting from the next hour, for the next 12 hours.
  const slots: string[] = [];
  const now = new Date();
  const start = new Date(now);
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() + 1);
  for (let i = 0; i < 12; i++) {
    const d = new Date(start.getTime() + i * 60 * 60 * 1000);
    const hh = d.getHours();
    const label = `${((hh + 11) % 12) + 1}:00 ${hh < 12 ? "AM" : "PM"}`;
    const isToday = d.getDate() === now.getDate();
    slots.push(isToday ? `Today ${label}` : `Tomorrow ${label}`);
  }
  return slots;
}

function Book() {
  const slots = useMemo(buildSlots, []);

  const [name, setName] = useState("");
  const [gameType, setGameType] = useState<"snooker" | "pool">("snooker");
  const [time, setTime] = useState(slots[0]);
  const [target, setTarget] = useState<typeof NUMBERS[number]["value"]>(NUMBERS[0].value);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | { whatsappSent: boolean }>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error("Please enter your name");
      return;
    }

    setLoading(true);
    const waText = encodeURIComponent(
      `Hi Akram Snooker! I just booked a ${gameType} table for ${time}. Name: ${name.trim()}${phone.trim() ? `, Phone: ${phone.trim()}` : ""}`,
    );
    const waNum = target.replace("+", "");
    window.open(`https://wa.me/${waNum}?text=${waText}`, "_blank");
    setDone({ whatsappSent: true });
    toast.success("WhatsApp booking opened. Send the message to complete your reservation.");
    setLoading(false);
  }

  if (done) {
    const waText = encodeURIComponent(
      `Hi Akram Snooker! I just booked a ${gameType} table for ${time}. Name: ${name}.`
    );
    const waNum = target.replace("+", "");
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-card border border-border glow-felt text-center animate-fade-up">
          <CheckCircle2 className="w-14 h-14 mx-auto text-[var(--color-felt-glow)]" />
          <h1 className="mt-4 font-display text-3xl font-bold">You're on the table</h1>
          <p className="mt-3 text-muted-foreground">
            We've got your booking for <strong className="text-foreground">{gameType.toUpperCase()}</strong> at{" "}
            <strong className="text-foreground">{time}</strong>.
          </p>
          {!done.whatsappSent && (
            <p className="mt-3 text-sm text-muted-foreground">
              Tap WhatsApp below so we can confirm the table for you.
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${waNum}?text=${waText}`}
              target="_blank" rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 glow-felt"
            >
              <MessageCircle className="w-4 h-4" /> Open WhatsApp
            </a>
            <button
              onClick={() => { setDone(null); setName(""); setPhone(""); }}
              className="px-5 py-2.5 rounded-full border border-border hover:bg-accent/40"
            >
              Book another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-felt-glow)] mb-3">Reserve</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">
            Book your <span className="text-gradient-felt">table</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Snooker 40 AED/hr · Pool 30 AED/hr · Open 24h
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="p-6 sm:p-8 rounded-2xl bg-card border border-border glow-felt space-y-5 animate-fade-up"
        >
          <div>
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ahmed"
              maxLength={60}
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label>Game type</Label>
            <Select value={gameType} onValueChange={(v) => setGameType(v as "snooker" | "pool")}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="snooker">Snooker — 40 AED/hr</SelectItem>
                <SelectItem value="pool">Pool / Billiards — 30 AED/hr</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {slots.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Send to</Label>
            <Select value={target} onValueChange={(v) => setTarget(v as typeof target)}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {NUMBERS.map((n) => (
                  <SelectItem key={n.value} value={n.value}>{n.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-1.5 text-xs text-muted-foreground">Which Akram Snooker number should get your booking?</p>
          </div>

          <div>
            <Label htmlFor="phone">Your phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+971…"
              maxLength={20}
              className="mt-1.5"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold glow-felt hover:scale-[1.01] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send booking via WhatsApp"}
          </button>

          <p className="text-xs text-center text-muted-foreground">
            By booking you agree to be contacted on WhatsApp to confirm your table.
          </p>
        </form>
      </div>
    </section>
  );
}
