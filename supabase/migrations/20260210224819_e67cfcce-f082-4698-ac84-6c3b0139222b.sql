
-- Allowed admins table
CREATE TABLE public.admin_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read admin_emails"
  ON public.admin_emails FOR SELECT
  TO authenticated
  USING (true);

-- Insert the 3 allowed admins
INSERT INTO public.admin_emails (email, name) VALUES
  ('aaron.latvia22@gmail.com', 'Aaron'),
  ('annmaryaldrena1225@gmail.com', 'Aldrena'),
  ('francisx799@gmail.com', 'Francis');

-- Accommodation section
CREATE TABLE public.budget_accommodation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  total_amount NUMERIC NOT NULL DEFAULT 15750,
  sponsors JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT DEFAULT '',
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.budget_accommodation ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read accommodation"
  ON public.budget_accommodation FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_emails WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

CREATE POLICY "Admins can insert accommodation"
  ON public.budget_accommodation FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_emails WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

CREATE POLICY "Admins can update accommodation"
  ON public.budget_accommodation FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_emails WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

CREATE POLICY "Admins can delete accommodation"
  ON public.budget_accommodation FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_emails WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

-- Train tickets section
CREATE TABLE public.budget_train_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_name TEXT NOT NULL,
  ticket_cost_up NUMERIC DEFAULT 0,
  ticket_cost_down NUMERIC DEFAULT 0,
  is_excluded BOOLEAN DEFAULT false,
  is_sponsored BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.budget_train_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read train_tickets"
  ON public.budget_train_tickets FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_emails WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

CREATE POLICY "Admins can insert train_tickets"
  ON public.budget_train_tickets FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_emails WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

CREATE POLICY "Admins can update train_tickets"
  ON public.budget_train_tickets FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_emails WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

CREATE POLICY "Admins can delete train_tickets"
  ON public.budget_train_tickets FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_emails WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

-- Security deposits section
CREATE TABLE public.budget_security_deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_name TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 2000,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('collected', 'pending', 'refunded')),
  collected_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.budget_security_deposits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read security_deposits"
  ON public.budget_security_deposits FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_emails WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

CREATE POLICY "Admins can insert security_deposits"
  ON public.budget_security_deposits FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_emails WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

CREATE POLICY "Admins can update security_deposits"
  ON public.budget_security_deposits FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_emails WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

CREATE POLICY "Admins can delete security_deposits"
  ON public.budget_security_deposits FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_emails WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

-- Insert default participants for train tickets
INSERT INTO public.budget_train_tickets (participant_name, is_excluded, is_sponsored) VALUES
  ('Aaron', false, true),
  ('Aldrena', false, true),
  ('Francis', false, true),
  ('Sinoj', false, true),
  ('Henosh', false, true),
  ('Nithin', false, true),
  ('Sonu', false, true),
  ('Hayden', true, false),
  ('Megha', false, true),
  ('Alter', false, true);

-- Insert default participants for security deposits
INSERT INTO public.budget_security_deposits (participant_name) VALUES
  ('Aaron'), ('Aldrena'), ('Francis'), ('Sinoj'), ('Henosh'),
  ('Nithin'), ('Sonu'), ('Hayden'), ('Megha'), ('Alter');

-- Insert default accommodation record
INSERT INTO public.budget_accommodation (total_amount, sponsors) VALUES
  (15750, '["Aaron", "Aldrena", "Hayden"]'::jsonb);

-- Enable realtime for all budget tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.budget_accommodation;
ALTER PUBLICATION supabase_realtime ADD TABLE public.budget_train_tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.budget_security_deposits;
