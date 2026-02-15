
-- Travel ID submissions table
CREATE TABLE public.travel_id_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_name text NOT NULL UNIQUE,
  phone text,
  id_type text,
  file_path text,
  submitted boolean NOT NULL DEFAULT false,
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.travel_id_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can view submission status (for tracker)
CREATE POLICY "Anyone can view submission status"
  ON public.travel_id_submissions FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can insert submissions (no auth for regular members)
CREATE POLICY "Anyone can insert submissions"
  ON public.travel_id_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Anyone can update their own submission by name
CREATE POLICY "Anyone can update submissions"
  ON public.travel_id_submissions FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Only admins can delete
CREATE POLICY "Only admins can delete submissions"
  ON public.travel_id_submissions FOR DELETE
  TO authenticated
  USING (is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())::text));

-- Settings table for admin toggles
CREATE TABLE public.app_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT 'false'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings
CREATE POLICY "Anyone can read settings"
  ON public.app_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only admins can modify settings
CREATE POLICY "Only admins can update settings"
  ON public.app_settings FOR UPDATE
  TO authenticated
  USING (is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())::text));

CREATE POLICY "Only admins can insert settings"
  ON public.app_settings FOR INSERT
  TO authenticated
  WITH CHECK (is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())::text));

-- Seed default setting
INSERT INTO public.app_settings (key, value) VALUES ('travel_id_collection_closed', 'false'::jsonb);

-- Seed all 10 members as pending
INSERT INTO public.travel_id_submissions (member_name, submitted) VALUES
  ('Aaron', false),
  ('Aldrena', false),
  ('Alter', false),
  ('Francis', false),
  ('Hayden', false),
  ('Henosh', false),
  ('Megha', false),
  ('Nithin', false),
  ('Sinoj', false),
  ('Sonu', false);

-- Private storage bucket for travel IDs
INSERT INTO storage.buckets (id, name, public) VALUES ('travel-ids', 'travel-ids', false);

-- Storage policies: anyone can upload, only admin can read
CREATE POLICY "Anyone can upload travel IDs"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'travel-ids');

CREATE POLICY "Only admins can view travel IDs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'travel-ids' AND is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())::text));
