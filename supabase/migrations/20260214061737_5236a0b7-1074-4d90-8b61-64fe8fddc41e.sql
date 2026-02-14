
-- Fix security: ensure all budget tables and admin_emails require authentication
-- Drop existing overly permissive policies and replace with strict ones

-- admin_emails: only authenticated users can check their own status
DROP POLICY IF EXISTS "Users can only view their own admin status" ON public.admin_emails;
DROP POLICY IF EXISTS "Admin users can view admin emails" ON public.admin_emails;
CREATE POLICY "Authenticated users can check own admin status"
  ON public.admin_emails FOR SELECT TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- budget_accommodation: admin only
DROP POLICY IF EXISTS "Admin users can view accommodation" ON public.budget_accommodation;
DROP POLICY IF EXISTS "Admin users can update accommodation" ON public.budget_accommodation;
DROP POLICY IF EXISTS "Admin users can insert accommodation" ON public.budget_accommodation;
CREATE POLICY "Admin read accommodation"
  ON public.budget_accommodation FOR SELECT TO authenticated
  USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admin write accommodation"
  ON public.budget_accommodation FOR ALL TO authenticated
  USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())))
  WITH CHECK (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));

-- budget_borrows: admin only
DROP POLICY IF EXISTS "Admin users can view borrows" ON public.budget_borrows;
DROP POLICY IF EXISTS "Admin users can manage borrows" ON public.budget_borrows;
CREATE POLICY "Admin read borrows"
  ON public.budget_borrows FOR SELECT TO authenticated
  USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admin manage borrows"
  ON public.budget_borrows FOR ALL TO authenticated
  USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())))
  WITH CHECK (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));

-- budget_security_deposits: admin only
DROP POLICY IF EXISTS "Admin users can view security deposits" ON public.budget_security_deposits;
DROP POLICY IF EXISTS "Admin users can manage security deposits" ON public.budget_security_deposits;
CREATE POLICY "Admin read security deposits"
  ON public.budget_security_deposits FOR SELECT TO authenticated
  USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admin manage security deposits"
  ON public.budget_security_deposits FOR ALL TO authenticated
  USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())))
  WITH CHECK (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));

-- budget_train_tickets: admin only
DROP POLICY IF EXISTS "Admin users can view train tickets" ON public.budget_train_tickets;
DROP POLICY IF EXISTS "Admin users can manage train tickets" ON public.budget_train_tickets;
CREATE POLICY "Admin read train tickets"
  ON public.budget_train_tickets FOR SELECT TO authenticated
  USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admin manage train tickets"
  ON public.budget_train_tickets FOR ALL TO authenticated
  USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())))
  WITH CHECK (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));

-- budget_audit_log: admin read-only (update already blocked)
DROP POLICY IF EXISTS "Admin users can view audit log" ON public.budget_audit_log;
DROP POLICY IF EXISTS "Admin users can insert audit log" ON public.budget_audit_log;
DROP POLICY IF EXISTS "Prevent audit log tampering" ON public.budget_audit_log;
CREATE POLICY "Admin read audit log"
  ON public.budget_audit_log FOR SELECT TO authenticated
  USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admin insert audit log"
  ON public.budget_audit_log FOR INSERT TO authenticated
  WITH CHECK (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Block audit log updates"
  ON public.budget_audit_log FOR UPDATE TO authenticated
  USING (false);
CREATE POLICY "Block audit log deletes"
  ON public.budget_audit_log FOR DELETE TO authenticated
  USING (false);

-- Change is_admin_email to SECURITY DEFINER for simplicity
CREATE OR REPLACE FUNCTION public.is_admin_email(check_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_emails WHERE email = check_email
  );
END;
$$;
