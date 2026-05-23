import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Akram Snooker, Dubai" },
      { name: "description", content: "Address, phone numbers and WhatsApp for Akram Snooker in International City, Dubai. Open 24 hours." },
      { property: "og:title", content: "Contact Akram Snooker" },
      { property: "og:description", content: "Call, WhatsApp or visit Akram Snooker in International City, Dubai." },
    ],
  }),
  component: Contact,
});

const PHONES = [
  { label: "+971 56 881 2699", tel: "+971568812699", wa: "971568812699" },
  { label: "+971 58 996 6987", tel: "+971589966987", wa: "971589966987" },
];

const waText = encodeURIComponent("Hi Akram Snooker! I'd like to ask about a table.");

function Contact() {
  return (
    <>
      <section className="py-20 px-4 sm:px-6 bg-felt-deep text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-felt-glow)] mb-4">Get in touch</p>
        <h1 className="font-display text-4xl sm:text-6xl font-bold">
          Say hello. <span className="text-gradient-felt">We're open 24h.</span>
        </h1>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
          Call, message us on WhatsApp, or just drop by. Walk-ins are always welcome.
        </p>
      </section>

      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
        <div className="p-8 rounded-2xl bg-card border border-border hover-lift">
          <MapPin className="w-8 h-8 text-[var(--color-felt-glow)]" />
          <h2 className="mt-4 font-display text-2xl font-semibold">Address</h2>
          <p className="mt-2 text-muted-foreground">
            5C34+JHG - Al Manama St<br /> next to Danube Building,<br />
            Warsan First, Dubai International City,<br /> Dubai, United Arab Emirates
          </p>
          <a
            href="https://www.google.com/maps/place/5C34+JHG+Dubai"
            target="_blank" rel="noreferrer"
            className="inline-block mt-4 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium glow-felt"
          >
            Get directions
          </a>
        </div>

        <div className="p-8 rounded-2xl bg-card border border-border hover-lift">
          <Clock className="w-8 h-8 text-[var(--color-felt-glow)]" />
          <h2 className="mt-4 font-display text-2xl font-semibold">Hours</h2>
          <p className="mt-2 text-muted-foreground">Open 24 hours, every day.</p>
          <p className="mt-1 text-sm text-muted-foreground">Yes — even at 3 AM. The felt's still green.</p>
        </div>

        <div className="p-8 rounded-2xl bg-card border border-border hover-lift md:col-span-2">
          <Phone className="w-8 h-8 text-[var(--color-felt-glow)]" />
          <h2 className="mt-4 font-display text-2xl font-semibold">Call or WhatsApp</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PHONES.map((p) => (
              <div key={p.tel} className="p-4 rounded-xl bg-background/60 border border-border flex flex-wrap items-center justify-between gap-3">
                <span className="font-medium">{p.label}</span>
                <div className="flex gap-2">
                  <a href={`tel:${p.tel}`} className="px-3 py-1.5 rounded-full text-sm border border-border hover:bg-accent/40 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                  <a
                    href={`https://wa.me/${p.wa}?text=${waText}`}
                    target="_blank" rel="noreferrer"
                    className="px-3 py-1.5 rounded-full text-sm bg-primary text-primary-foreground flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 max-w-5xl mx-auto pb-20">
        <div className="rounded-2xl overflow-hidden border border-border glow-felt">
          <iframe
            title="Akram Snooker location on Google Maps"
            src="https://www.google.com/maps?q=5C34%2BJHG+Dubai+United+Arab+Emirates&output=embed"
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />
        </div>
      </section>
    </>
  );
}
