
-- Create a helper function that checks if the current authenticated user is an admin
-- This avoids the "permission denied for table users" error by using SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_emails
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );
$$;

-- Drop old policies on travel_id_submissions that reference auth.users directly
DROP POLICY IF EXISTS "Only admins can read full submissions" ON public.travel_id_submissions;
DROP POLICY IF EXISTS "Only admins can delete submissions" ON public.travel_id_submissions;

-- Recreate with the helper function
CREATE POLICY "Only admins can read full submissions"
ON public.travel_id_submissions
FOR SELECT
USING (public.is_current_user_admin());

CREATE POLICY "Only admins can delete submissions"
ON public.travel_id_submissions
FOR DELETE
USING (public.is_current_user_admin());
