import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Coffee, Wifi, Tv, Music, Clock, MapPin, Users } from "lucide-react";
import { AboutPhotoGalleries } from "@/components/site/AboutPhotoGalleries";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Akram Snooker | Dubai's 24h Snooker & Pool Club" },
      { name: "description", content: "Akram Snooker in International City is Dubai's 24/7 chill spot for snooker and pool, with café, live sports and music." },
      { property: "og:title", content: "About Akram Snooker" },
      { property: "og:description", content: "Dubai's 24/7 snooker & pool club — café, live sports, music, great vibe." },
    ],
  }),
  component: About,
});

const facts = [
  { icon: Trophy, label: "4 Pro Snooker Tables", value: "40 AED / hr" },
  { icon: Trophy, label: "3 Pool / Billiards Tables", value: "30 AED / hr" },
  { icon: Clock, label: "Open Daily", value: "24 Hours" },
  { icon: Users, label: "Everyone Welcome", value: "No membership" },
  { icon: Coffee, label: "Café Service", value: "Drinks · Snacks · Food" },
  { icon: Wifi, label: "In-house Wi-Fi", value: "Free for all guests" },
  { icon: Tv, label: "Big Screens", value: "Football · Cricket" },
  { icon: Music, label: "Music", value: "Right vibe, always" },
];

function About() {
  return (
    <>
      <section className="relative py-24 px-4 sm:px-6 bg-felt-deep">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-felt-glow)] mb-4 animate-fade-up">Our Story</p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Where Dubai comes to <span className="text-gradient-felt">play</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Akram Snooker started with one simple idea: the city needed a real, no-frills place
            to play great snooker and pool — open whenever you wanted, with great food, music,
            and the matches that matter on the screen.
          </p>
        </div>
      </section>

      <AboutPhotoGalleries />

      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl font-bold">The atmosphere</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Step inside and the energy hits you — warm overhead lights pooling onto green
          felt, the soft clack of balls, music in the background, and somewhere a TV
          playing the night's biggest match. It's the kind of place where two friends
          walk in for one frame and stay for four.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Whether you grew up with a cue in your hand or you're just learning what a snooker
          break is, the vibe stays the same: relaxed, friendly, focused on the game.
        </p>
      </section>

      <section className="py-8 px-4 sm:px-6 max-w-3xl mx-auto text-center border-t border-border/50">
        <h2 className="font-display text-3xl font-bold">Café, drinks, big matches</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Hungry between frames? The in-house café serves cold drinks, snacks and full food
          orders straight to your table. When the football or cricket is on, we put it up on
          the big screen — so you never miss a goal or a wicket.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Free Wi-Fi for everyone. Open 24 hours. Walk-ins welcome.
        </p>
      </section>

      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">At a glance</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.label} className="p-6 rounded-2xl bg-card border border-border hover-lift animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <f.icon className="w-7 h-7 text-[var(--color-felt-glow)]" />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{f.label}</div>
              <div className="font-display text-lg font-semibold mt-1">{f.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-felt-deep">
        <div className="max-w-3xl mx-auto text-center">
          <MapPin className="w-8 h-8 mx-auto text-[var(--color-felt-glow)]" />
          <h2 className="mt-4 font-display text-3xl font-bold">Find us</h2>
          <p className="mt-3 text-muted-foreground">
            Al Manama Street, next to Danube Building,<br />
            Warsan First, International City, Dubai, UAE
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://share.google/p2luUFGAS6wY2wHs0"
              target="_blank" rel="noreferrer"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold glow-felt"
            >
              Open in Google Maps
            </a>
            <Link to="/book" className="px-6 py-3 rounded-full border border-border bg-background/40 backdrop-blur hover:bg-accent/40">
              Book a Table
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
