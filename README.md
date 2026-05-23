# Akram Snooker Hub

Website for Akram Snooker — Dubai's 24/7 snooker and pool club (International City).

## Features

- Public site: home, about (photo gallery), book a table, contact
- Staff area: login and table billing (8 snooker + 3 pool tables)

## Setup

```bash
bun install
cp .env.example .env   # add your Supabase keys
bun dev
```

Open http://localhost:8080

## Staff login

- Menu: **Staff** → `/login`
- Default credentials are set in `src/lib/staff-auth.ts` (change before production)

## Scripts

| Command       | Description        |
|---------------|--------------------|
| `bun dev`     | Development server |
| `bun run build` | Production build |
| `bun run preview` | Preview build    |
