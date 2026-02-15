
-- Fix: Travel ID public data exposure
-- Create a public view exposing only safe columns (no phone, file_path, id_type)
CREATE VIEW public.travel_id_status
WITH (security_invoker = false)
AS
  SELECT member_name, submitted, submitted_at
  FROM public.travel_id_submissions;

-- Grant access on the view to anon and authenticated
GRANT SELECT ON public.travel_id_status TO anon, authenticated;

-- Restrict direct table SELECT to admins only
DROP POLICY IF EXISTS "Anyone can view submission status" ON public.travel_id_submissions;

CREATE POLICY "Only admins can read full submissions"
  ON public.travel_id_submissions FOR SELECT
  TO authenticated
  USING (is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())::text));

-- Also remove direct anonymous upload policy from storage (will use edge function instead)
DROP POLICY IF EXISTS "Anyone can upload travel IDs" ON storage.objects;
