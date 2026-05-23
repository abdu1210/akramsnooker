import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Coffee, Wifi, Tv, Music, Clock, MapPin, Quote } from "lucide-react";
import { SiteLogo } from "@/components/site/SiteLogo";
import heroImg from "@/assets/hero-snooker.jpg";
import poolImg from "@/assets/pool-table.jpg";
import interiorImg from "@/assets/club-interior.jpg";
import cafeImg from "@/assets/cafe-area.jpg";
import cueImg from "@/assets/cue-action.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akram Snooker — Snooker & Pool Club in Dubai" },
      { name: "description", content: "Play snooker (40 AED/hr) and pool (30 AED/hr) at Akram Snooker, International City, Dubai. Open 24h with café, live football & cricket, free Wi-Fi." },
      { property: "og:title", content: "Akram Snooker — Dubai's 24/7 Snooker & Pool Club" },
      { property: "og:description", content: "4 pro snooker tables · 3 pool tables · Café · Live sports · Open 24h." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const quotes = [
  { t: "Pool is a gentleman's game played by hustlers.", a: "Old billiards proverb" },
  { t: "Snooker is chess at 100 mph.", a: "Steve Davis" },
  { t: "You can't get away from yourself by moving from one place to another.", a: "Ernest Hemingway" },
  { t: "The cue ball is the only ball that matters.", a: "Pool wisdom" },
];

const features = [
  { icon: Trophy, title: "4 Pro Snooker Tables", body: "Tournament-grade tables. 40 AED per hour." },
  { icon: Trophy, title: "3 Pool / Billiards Tables", body: "Quick games and serious frames. 30 AED per hour." },
  { icon: Wifi, title: "Free Wi-Fi", body: "Stay connected between shots." },
  { icon: Tv, title: "Live Football & Cricket", body: "Big screens, bigger matches." },
  { icon: Music, title: "Music & Vibes", body: "Right playlist, right energy." },
  { icon: Coffee, title: "Café & Cold Drinks", body: "Snacks, drinks and food orders while you play." },
  { icon: Clock, title: "Open 24 Hours", body: "Late-night frame? We're open." },
  { icon: MapPin, title: "International City, Dubai", body: "Next to Danube Building, Warsan First." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-felt-deep">
        <div className="absolute inset-0 opacity-30">
          <img src={heroImg} alt="" className="w-full h-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-36 text-center">
          <SiteLogo size="lg" className="mx-auto mb-8 animate-float-slow" />
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-felt-glow)] mb-4 animate-fade-up">
            Dubai · International City · Open 24h
          </p>
          <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[1.05] animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Rack 'em up at <br />
            <span className="text-gradient-felt">Akram Snooker</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Pro snooker, pool, live football, music and cold drinks — Dubai's chill spot to play,
            chase a frame, or just hang out with friends. Anytime, day or night.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/book" className="px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold glow-felt hover:scale-[1.03] transition">
              Book a Table
            </Link>
            <Link to="/contact" className="px-7 py-3.5 rounded-full border border-border bg-background/40 backdrop-blur hover:bg-accent/40 transition font-medium">
              Visit Us
            </Link>
          </div>

          {/* Price strip */}
          <div className="mt-14 inline-flex flex-wrap justify-center gap-3 sm:gap-8 px-6 py-4 rounded-2xl bg-card/60 border border-border backdrop-blur animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-left">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Snooker</div>
              <div className="font-display text-2xl font-bold text-gradient-gold">40 AED<span className="text-base text-muted-foreground font-medium">/hr</span></div>
            </div>
            <div className="w-px bg-border self-stretch" />
            <div className="text-left">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Pool</div>
              <div className="font-display text-2xl font-bold text-gradient-gold">30 AED<span className="text-base text-muted-foreground font-medium">/hr</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US / FEATURES */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Why Akram Snooker</h2>
          <p className="mt-3 text-muted-foreground">Everything you need for the perfect game night.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl bg-card border border-border hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <f.icon className="w-7 h-7 text-[var(--color-felt-glow)] group-hover:scale-110 transition" />
              <h3 className="mt-4 font-display font-semibold text-lg">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-center">
          <div className="relative">
            <img
              src={interiorImg}
              alt="Akram Snooker club interior with multiple tables"
              loading="lazy"
              width={1280}
              height={960}
              className="rounded-2xl object-cover w-full h-full glow-felt"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-felt-glow)] mb-3">About the club</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              More than a game. <br />It's a <span className="text-gradient-felt">vibe</span>.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Akram Snooker is Dubai's late-night escape — where the green felt glows under
              the lights, the music keeps the energy up, and football matches play on the
              big screen between frames. Whether you're a serious player chasing the perfect
              century break or just hanging out with friends, we've got the table, the drink,
              and the time. Always.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Four pro snooker tables. Three pool tables. A full café running 24/7 with cold
              drinks, snacks and food orders served right to your table. Free Wi-Fi. No
              membership. Just walk in, chalk up, and play.
            </p>
            <Link to="/about" className="inline-block mt-6 text-[var(--color-felt-glow)] hover:text-foreground font-medium">
              Read more →
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Inside the club</h2>
          <p className="mt-3 text-muted-foreground">A taste of the atmosphere.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:row-span-2 overflow-hidden rounded-2xl group">
            <img src={poolImg} alt="Pool table with vibrant lighting" loading="lazy" width={1280} height={960}
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="overflow-hidden rounded-2xl group">
            <img src={cueImg} alt="Cue stick striking a white ball" loading="lazy" width={1280} height={960}
              className="w-full h-64 object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="overflow-hidden rounded-2xl group">
            <img src={cafeImg} alt="Café area with drinks and football match on TV" loading="lazy" width={1280} height={960}
              className="w-full h-64 object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="md:col-span-2 overflow-hidden rounded-2xl group">
            <img src={interiorImg} alt="Wide view of the snooker club" loading="lazy" width={1280} height={960}
              className="w-full h-64 object-cover transition duration-700 group-hover:scale-105" />
          </div>
        </div>
      </section>

      {/* QUOTES */}
      <section className="py-20 px-4 sm:px-6 bg-felt-deep">
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2">
          {quotes.map((q, i) => (
            <figure
              key={q.t}
              className="p-8 rounded-2xl bg-card/70 border border-border backdrop-blur hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Quote className="w-6 h-6 text-[var(--color-felt-glow)] mb-3" />
              <blockquote className="font-display text-xl leading-snug">"{q.t}"</blockquote>
              <figcaption className="mt-3 text-sm text-muted-foreground">— {q.a}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 text-center">
        <h2 className="font-display text-3xl sm:text-5xl font-bold">
          Ready for your next <span className="text-gradient-felt">break</span>?
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Book a table in seconds. We'll get your message instantly on WhatsApp.
        </p>
        <Link to="/book" className="inline-block mt-8 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold glow-felt hover:scale-[1.03] transition">
          Book a Table Now
        </Link>
      </section>
    </>
  );
}
