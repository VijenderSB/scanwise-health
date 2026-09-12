CREATE TABLE public.scan_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id uuid NOT NULL REFERENCES public.centres(id) ON DELETE CASCADE,
  scan_type_id uuid REFERENCES public.scan_types(id) ON DELETE SET NULL,
  protocol_code text NOT NULL,
  scan_name text NOT NULL,
  inclusions text[] NOT NULL DEFAULT '{}'::text[],
  exclusions text[] NOT NULL DEFAULT '{}'::text[],
  regular_price_inr integer NOT NULL CHECK (regular_price_inr > 0),
  offer_price_inr integer NOT NULL CHECK (offer_price_inr > 0),
  mandatory_charges_inr integer NOT NULL DEFAULT 0 CHECK (mandatory_charges_inr >= 0),
  verified boolean NOT NULL DEFAULT false,
  verified_at timestamp with time zone,
  valid_from timestamp with time zone NOT NULL DEFAULT now(),
  valid_until timestamp with time zone NOT NULL,
  limited_slots boolean NOT NULL DEFAULT false,
  terms text NOT NULL DEFAULT '',
  latitude double precision,
  longitude double precision,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT scan_offers_prices_valid CHECK (regular_price_inr > offer_price_inr + mandatory_charges_inr),
  CONSTRAINT scan_offers_dates_valid CHECK (valid_until > valid_from),
  CONSTRAINT scan_offers_verification_valid CHECK (NOT verified OR verified_at IS NOT NULL)
);
GRANT SELECT ON public.scan_offers TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.scan_offers TO authenticated;
GRANT ALL ON public.scan_offers TO service_role;
ALTER TABLE public.scan_offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Current verified scan offers are public"
ON public.scan_offers FOR SELECT TO anon, authenticated
USING (verified AND valid_from <= now() AND valid_until > now());
CREATE POLICY "Admins manage scan offers"
ON public.scan_offers FOR ALL TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER scan_offers_updated
BEFORE UPDATE ON public.scan_offers
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.enquiries
  ADD COLUMN selected_centre_id uuid REFERENCES public.centres(id) ON DELETE SET NULL,
  ADD COLUMN protocol_code text,
  ADD COLUMN offer_id uuid REFERENCES public.scan_offers(id) ON DELETE SET NULL,
  ADD COLUMN regular_price_inr integer CHECK (regular_price_inr IS NULL OR regular_price_inr > 0),
  ADD COLUMN offer_price_inr integer CHECK (offer_price_inr IS NULL OR offer_price_inr > 0),
  ADD COLUMN mandatory_charges_inr integer CHECK (mandatory_charges_inr IS NULL OR mandatory_charges_inr >= 0),
  ADD COLUMN savings_inr integer CHECK (savings_inr IS NULL OR savings_inr >= 0),
  ADD COLUMN discount_percent integer CHECK (discount_percent IS NULL OR discount_percent BETWEEN 0 AND 100),
  ADD COLUMN price_verified boolean NOT NULL DEFAULT false,
  ADD COLUMN pricing_snapshot jsonb;

CREATE INDEX scan_offers_active_protocol_idx ON public.scan_offers (protocol_code, valid_until) WHERE verified;
CREATE INDEX enquiries_offer_id_idx ON public.enquiries (offer_id);