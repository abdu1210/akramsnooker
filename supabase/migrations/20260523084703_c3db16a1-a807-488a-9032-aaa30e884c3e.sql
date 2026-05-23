CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  game_type text NOT NULL CHECK (game_type IN ('snooker','pool')),
  time_slot text NOT NULL,
  target_whatsapp text NOT NULL,
  customer_phone text,
  whatsapp_sent boolean NOT NULL DEFAULT false,
  whatsapp_error text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- No public SELECT/UPDATE/DELETE policies; writes are done server-side via service role.
-- Allow anonymous INSERTs only through the server function (service role bypasses RLS),
-- so we intentionally do not add an INSERT policy for anon.

CREATE INDEX bookings_created_at_idx ON public.bookings (created_at DESC);