
-- Fix admin_emails RLS: restrict SELECT to admins only using security definer function
DROP POLICY IF EXISTS "Authenticated users can read admin_emails" ON public.admin_emails;

CREATE OR REPLACE FUNCTION public.is_admin_email(check_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_emails WHERE email = check_email
  )
$$;

CREATE POLICY "Only admins can read admin_emails"
ON public.admin_emails
FOR SELECT
TO authenticated
USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));

-- Update all budget table RLS policies to use the security definer function
-- budget_accommodation
DROP POLICY IF EXISTS "Admins can read accommodation" ON public.budget_accommodation;
DROP POLICY IF EXISTS "Admins can insert accommodation" ON public.budget_accommodation;
DROP POLICY IF EXISTS "Admins can update accommodation" ON public.budget_accommodation;
DROP POLICY IF EXISTS "Admins can delete accommodation" ON public.budget_accommodation;

CREATE POLICY "Admins can read accommodation" ON public.budget_accommodation FOR SELECT TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can insert accommodation" ON public.budget_accommodation FOR INSERT TO authenticated WITH CHECK (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can update accommodation" ON public.budget_accommodation FOR UPDATE TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can delete accommodation" ON public.budget_accommodation FOR DELETE TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));

-- budget_train_tickets
DROP POLICY IF EXISTS "Admins can read train_tickets" ON public.budget_train_tickets;
DROP POLICY IF EXISTS "Admins can insert train_tickets" ON public.budget_train_tickets;
DROP POLICY IF EXISTS "Admins can update train_tickets" ON public.budget_train_tickets;
DROP POLICY IF EXISTS "Admins can delete train_tickets" ON public.budget_train_tickets;

CREATE POLICY "Admins can read train_tickets" ON public.budget_train_tickets FOR SELECT TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can insert train_tickets" ON public.budget_train_tickets FOR INSERT TO authenticated WITH CHECK (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can update train_tickets" ON public.budget_train_tickets FOR UPDATE TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can delete train_tickets" ON public.budget_train_tickets FOR DELETE TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));

-- budget_security_deposits
DROP POLICY IF EXISTS "Admins can read security_deposits" ON public.budget_security_deposits;
DROP POLICY IF EXISTS "Admins can insert security_deposits" ON public.budget_security_deposits;
DROP POLICY IF EXISTS "Admins can update security_deposits" ON public.budget_security_deposits;
DROP POLICY IF EXISTS "Admins can delete security_deposits" ON public.budget_security_deposits;

CREATE POLICY "Admins can read security_deposits" ON public.budget_security_deposits FOR SELECT TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can insert security_deposits" ON public.budget_security_deposits FOR INSERT TO authenticated WITH CHECK (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can update security_deposits" ON public.budget_security_deposits FOR UPDATE TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can delete security_deposits" ON public.budget_security_deposits FOR DELETE TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));

-- Create budget_borrows table
CREATE TABLE public.budget_borrows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  borrower_name TEXT NOT NULL,
  lender_name TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  reason TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.budget_borrows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read borrows" ON public.budget_borrows FOR SELECT TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can insert borrows" ON public.budget_borrows FOR INSERT TO authenticated WITH CHECK (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can update borrows" ON public.budget_borrows FOR UPDATE TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can delete borrows" ON public.budget_borrows FOR DELETE TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));

-- Create audit_log table
CREATE TABLE public.budget_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  action TEXT NOT NULL,
  field_name TEXT,
  previous_value TEXT,
  new_value TEXT,
  changed_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.budget_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read audit_log" ON public.budget_audit_log FOR SELECT TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can insert audit_log" ON public.budget_audit_log FOR INSERT TO authenticated WITH CHECK (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Admins can delete audit_log" ON public.budget_audit_log FOR DELETE TO authenticated USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())));
