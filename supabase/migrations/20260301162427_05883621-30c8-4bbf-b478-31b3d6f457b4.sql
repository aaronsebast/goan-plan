
-- Recreate the travel_id_status view with SECURITY INVOKER instead of SECURITY DEFINER
DROP VIEW IF EXISTS public.travel_id_status;

CREATE VIEW public.travel_id_status
WITH (security_invoker = true)
AS
SELECT member_name, submitted, submitted_at
FROM public.travel_id_submissions;
