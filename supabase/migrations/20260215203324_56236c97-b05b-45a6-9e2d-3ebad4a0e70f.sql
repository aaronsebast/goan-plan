
-- Remove the old broken storage policy that references auth.users directly
DROP POLICY IF EXISTS "Only admins can view travel IDs" ON storage.objects;
