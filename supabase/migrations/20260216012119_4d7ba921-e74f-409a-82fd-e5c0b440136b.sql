
-- Allow admins to update any travel_id_submissions row
CREATE POLICY "Admins can update submissions"
ON public.travel_id_submissions
FOR UPDATE
USING (public.is_current_user_admin())
WITH CHECK (public.is_current_user_admin());
