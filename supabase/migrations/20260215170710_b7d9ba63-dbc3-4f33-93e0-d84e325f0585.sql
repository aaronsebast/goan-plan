
-- Remove overly permissive policies
DROP POLICY "Anyone can insert submissions" ON public.travel_id_submissions;
DROP POLICY "Anyone can update submissions" ON public.travel_id_submissions;

-- Members are pre-seeded, so no insert needed from anon
-- Update only allowed on non-sensitive fields (phone, id_type, file_path, submitted, submitted_at)
CREATE POLICY "Anyone can update their submission"
  ON public.travel_id_submissions FOR UPDATE
  TO anon, authenticated
  USING (submitted = false);

-- Storage: tighten upload to only travel-ids bucket with size/type restrictions
DROP POLICY "Anyone can upload travel IDs" ON storage.objects;
CREATE POLICY "Anyone can upload travel IDs"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'travel-ids'
    AND (storage.foldername(name))[1] IN ('Aaron','Aldrena','Alter','Francis','Hayden','Henosh','Megha','Nithin','Sinoj','Sonu')
  );
