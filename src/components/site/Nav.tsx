import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SiteLogo } from "@/components/site/SiteLogo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/book", label: "Book a Table" },
  { to: "/contact", label: "Contact" },
  { to: "/login", label: "Staff" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <SiteLogo size="sm" className="animate-glow-pulse" />
          <span className="font-display text-lg font-bold tracking-tight">
            AKRAM <span className="text-gradient-felt">SNOOKER</span>
          </span>
          <span role="img" aria-label="United Arab Emirates flag" className="text-base">🇦🇪</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/30"
              activeProps={{ className: "text-foreground bg-accent/40" }}
              activeOptions={{
                exact: l.to === "/",
                include: l.to === "/login" ? ["/login", "/staff"] : undefined,
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/book"
            className="ml-2 px-4 py-2 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:opacity-90 transition glow-felt"
          >
            Book Now
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-md hover:bg-accent/40"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 animate-fade-in">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm hover:bg-accent/40"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
