import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import { SiteLogo } from "@/components/site/SiteLogo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-felt-deep mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <SiteLogo size="sm" />
            <span className="font-display font-bold text-lg">
              AKRAM <span className="text-gradient-felt">SNOOKER</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Dubai's chill spot for snooker, pool & football nights. Open 24/7.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <h4 className="font-display font-semibold text-foreground mb-2">Visit Us</h4>
          <p className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 mt-0.5 text-[var(--color-felt-glow)]" />
            <span>Al Manama St, next to Danube Building,<br /> Warsan First, International City, Dubai</span>
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4 text-[var(--color-felt-glow)]" />
            <a href="tel:+971568812699" className="hover:text-foreground">+971 56 881 2699</a>
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Instagram className="w-4 h-4 text-[var(--color-felt-glow)]" />
            <a href="https://www.instagram.com/akram_snooker/" target="_blank" rel="noreferrer" className="hover:text-foreground">@akram_snooker</a>
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-[var(--color-felt-glow)]" />
            <span>Open 24 hours</span>
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <h4 className="font-display font-semibold text-foreground mb-2">Explore</h4>
          <Link to="/" className="block text-muted-foreground hover:text-foreground">Home</Link>
          <Link to="/about" className="block text-muted-foreground hover:text-foreground">About</Link>
          <Link to="/book" className="block text-muted-foreground hover:text-foreground">Book a Table</Link>
          <Link to="/contact" className="block text-muted-foreground hover:text-foreground">Contact</Link>
          <Link to="/login" className="block text-muted-foreground hover:text-foreground">Staff</Link>
        </div>
      </div>
      <div className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Akram Snooker. All rights reserved.
      </div>
    </footer>
  );
}
