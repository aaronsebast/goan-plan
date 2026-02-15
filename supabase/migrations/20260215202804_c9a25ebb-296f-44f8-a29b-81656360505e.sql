
-- Allow admins to read/download files from travel-ids bucket
CREATE POLICY "Admins can read travel-id files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'travel-ids' AND public.is_current_user_admin());
