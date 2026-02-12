-- Fix 1: Add RESTRICTIVE UPDATE policy to budget_audit_log to prevent tampering
CREATE POLICY "Prevent all updates to audit log entries"
ON public.budget_audit_log
FOR UPDATE
TO authenticated
USING (FALSE);

-- Fix 2: Replace SECURITY DEFINER function with SECURITY INVOKER to prevent RLS bypass
-- This ensures the function uses the calling user's privileges instead of superuser
CREATE OR REPLACE FUNCTION public.is_admin_email(check_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_emails WHERE email = check_email
  )
$$;

-- Restrict admin_emails visibility to prevent email enumeration
-- Users can only see if they themselves are admin
DROP POLICY IF EXISTS "Only admins can read admin_emails" ON public.admin_emails;

CREATE POLICY "Users can only view their own admin status"
ON public.admin_emails
FOR SELECT
TO authenticated
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));