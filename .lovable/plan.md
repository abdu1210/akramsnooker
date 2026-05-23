## Akram Snooker — Website Plan

A 4-page animated site with a dark, futuristic look, green snooker-felt accents, and a real booking form that sends WhatsApp messages automatically and stores each booking in a database.

### Pages

1. **Home (`/`)**
   - Animated hero: dark background, subtle moving felt-green glow, neon cue-ball orb, headline + tagline + two CTAs ("Book a Table", "Visit Us").
   - "Why Akram Snooker" strip: 4 pro snooker tables · 3 pool/billiards tables · Free Wi-Fi · Live football & cricket · Music · Snacks & cold drinks · Open 24/7.
   - About section (short): warm, fun copy about the vibe — chilling spot, music, matches on screen, food & drinks while you play.
   - Pricing teaser: Snooker **40 AED/hr**, Pool **30 AED/hr**.
   - Gallery: image grid with hover zoom + fade-in-on-scroll animations (uses the photos you'll upload).
   - Quotes carousel: rotating snooker/billiards quotes (e.g. Ronnie O'Sullivan, Steve Davis, classic sayings like "Pool is a gentleman's game played by hustlers").
   - Footer with address, phones, Google Maps link.

2. **About (`/about`)**
   - Longer story of Akram Snooker, the atmosphere, what makes it special.
   - Facilities list with icons and animated cards.
   - "What's on" — music, live sports, café menu mention.
   - Embedded Google Map of the Warsan/International City location.

3. **Booking (`/book`)**
   - Form fields:
     - **Name** (required, 2–60 chars)
     - **Game type** (select: Snooker / Pool)
     - **Time** (select: hourly slots for today, generated from current hour up to midnight)
     - **WhatsApp number to notify** (select: +971 56 881 2699 / +971 58 996 6987)
     - Optional: phone number of the customer (so you can call back)
   - On submit:
     - Validate with Zod.
     - Save booking row to the database.
     - Server sends a WhatsApp message via **Twilio** to the selected business number with: name, game type, time, customer phone.
     - Show success toast + confirmation card.
   - Animated form with felt-green focus rings and a neon submit button.

4. **Contact (`/contact`)**
   - Address, both phone numbers (click-to-call), WhatsApp click-to-chat buttons (wa.me links as backup), hours (Open 24h), Google Maps embed + "Get directions" button.
   - Quick "Send us a message" link that opens WhatsApp pre-filled.

### Design system

- **Theme**: dark base (near-black) with snooker-felt green (`oklch` token) as accent, soft neon cue-ball white glow, brass/gold highlight for prices and CTAs.
- **Typography**: bold display font for headings (Space Grotesk / Sora), clean sans for body (Inter).
- **Animations**: fade-in-up on scroll, hover-scale on cards/images, subtle parallax on hero, animated gradient/felt-texture background, glowing button states. Tasteful — not overwhelming.
- All colors as semantic tokens in `src/styles.css` (no hardcoded colors in components).

### Backend (Lovable Cloud + Twilio)

- Enable **Lovable Cloud** for the database.
- Create `bookings` table: `id`, `name`, `game_type`, `time_slot`, `target_whatsapp`, `customer_phone`, `created_at`. RLS: public can INSERT only; reads restricted.
- Connect **Twilio** connector (you'll click through the connection flow once).
- Server function `submitBooking` (TanStack `createServerFn`):
  - Zod-validates input.
  - Inserts booking via admin client.
  - Calls Twilio gateway → `POST /Messages.json` to send WhatsApp message to selected number.
- Simple in-memory rate limit (e.g. 5 submissions/min/IP) to reduce abuse.

### What I need from you

1. **Photos of Akram Snooker** — upload them in chat (tables, café area, exterior, vibe shots). I'll place them in the gallery, hero, and about sections.
2. **Twilio account** with a WhatsApp-enabled sender:
   - Either the Twilio Sandbox for WhatsApp (fastest for testing — your numbers must opt in once by texting a code), or a fully approved WhatsApp Business sender (for production).
   - I'll trigger the Twilio connect flow when we get to the backend step — you'll just pick or create the connection.
3. **Confirm**: do you want the customer's phone number captured too (optional field), or strictly just name + game + time?
4. **Logo** (optional) — if you have one, upload it; otherwise I'll set a typographic wordmark "AKRAM SNOOKER" with a small cue-ball mark.

### Technical notes

- Stack: TanStack Start (already set up), Tailwind v4, shadcn/ui, Lovable Cloud (Supabase under the hood), Twilio via connector gateway.
- Each page is its own route file under `src/routes/` (`index.tsx`, `about.tsx`, `book.tsx`, `contact.tsx`) with its own SEO `head()` metadata.
- Booking write path: client form → `useServerFn(submitBooking)` → server fn → DB insert + Twilio call → typed response.
- WhatsApp fallback: even if Twilio fails or is not connected yet, the contact page's `wa.me` click-to-chat buttons still work.
- Hourly slots are generated client-side from "now" to 23:00; if it's late, we offer slots into early morning.

### Build order

1. Design tokens + theme (dark + felt green + neon).
2. Shared layout (animated nav, footer) in `__root.tsx`.
3. Home page with hero, about section, gallery (placeholders until photos arrive), quotes.
4. About page + Contact page (static content + map + wa.me links).
5. Enable Lovable Cloud → create `bookings` table.
6. Build booking form UI (works without backend too — just shows a "Contact via WhatsApp" fallback button if Twilio isn't connected).
7. Connect Twilio → wire `submitBooking` server function → live test.
8. Polish animations, mobile responsiveness, SEO meta per page.

Reply with the photos and a yes/no on the customer-phone field, and I'll start building.