
-- =============================================
-- TRIP COORDINATOR FINANCE MODULE - NEW TABLES
-- Does NOT touch any existing tables
-- =============================================

-- 1) Trip Members
CREATE TABLE public.trip_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.trip_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read trip_members" ON public.trip_members FOR SELECT USING (public.is_current_user_admin());
CREATE POLICY "Admin insert trip_members" ON public.trip_members FOR INSERT WITH CHECK (public.is_current_user_admin());
CREATE POLICY "Admin update trip_members" ON public.trip_members FOR UPDATE USING (public.is_current_user_admin());
CREATE POLICY "Admin delete trip_members" ON public.trip_members FOR DELETE USING (public.is_current_user_admin());

-- Seed 10 members
INSERT INTO public.trip_members (name) VALUES
  ('Alter'), ('Francis'), ('Hayden'), ('Megha'), ('Sinoj'),
  ('Aron'), ('Sonu'), ('Nithin'), ('Henosh'), ('Aldrena');

-- 2) Accommodation Settings (single row)
CREATE TABLE public.accommodation_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  villa_total numeric NOT NULL DEFAULT 15750,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.accommodation_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read accommodation_settings" ON public.accommodation_settings FOR SELECT USING (public.is_current_user_admin());
CREATE POLICY "Admin update accommodation_settings" ON public.accommodation_settings FOR UPDATE USING (public.is_current_user_admin());
CREATE POLICY "Admin insert accommodation_settings" ON public.accommodation_settings FOR INSERT WITH CHECK (public.is_current_user_admin());

INSERT INTO public.accommodation_settings (villa_total) VALUES (15750);

-- 3) Accommodation Sponsors
CREATE TABLE public.accommodation_sponsors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid NOT NULL REFERENCES public.trip_members(id) ON DELETE CASCADE,
  share_amount numeric NOT NULL DEFAULT 0,
  amount_received numeric NOT NULL DEFAULT 0,
  is_paid boolean NOT NULL DEFAULT false,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.accommodation_sponsors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read accommodation_sponsors" ON public.accommodation_sponsors FOR SELECT USING (public.is_current_user_admin());
CREATE POLICY "Admin manage accommodation_sponsors" ON public.accommodation_sponsors FOR ALL USING (public.is_current_user_admin()) WITH CHECK (public.is_current_user_admin());

-- Seed sponsors
INSERT INTO public.accommodation_sponsors (member_id, share_amount)
SELECT id, 5250 FROM public.trip_members WHERE name IN ('Aron', 'Aldrena', 'Hayden');

-- 4) Deposit Settings (single row)
CREATE TABLE public.deposit_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  default_deposit_amount numeric NOT NULL DEFAULT 2000
);
ALTER TABLE public.deposit_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read deposit_settings" ON public.deposit_settings FOR SELECT USING (public.is_current_user_admin());
CREATE POLICY "Admin update deposit_settings" ON public.deposit_settings FOR UPDATE USING (public.is_current_user_admin());
CREATE POLICY "Admin insert deposit_settings" ON public.deposit_settings FOR INSERT WITH CHECK (public.is_current_user_admin());

INSERT INTO public.deposit_settings (default_deposit_amount) VALUES (2000);

-- 5) Security Deposits (new table, does NOT touch budget_security_deposits)
CREATE TABLE public.security_deposits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid NOT NULL REFERENCES public.trip_members(id) ON DELETE CASCADE,
  deposit_amount numeric NOT NULL DEFAULT 2000,
  collected boolean NOT NULL DEFAULT false,
  collected_at timestamptz,
  refunded boolean NOT NULL DEFAULT false,
  refunded_at timestamptz,
  note text,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.security_deposits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read security_deposits_new" ON public.security_deposits FOR SELECT USING (public.is_current_user_admin());
CREATE POLICY "Admin manage security_deposits_new" ON public.security_deposits FOR ALL USING (public.is_current_user_admin()) WITH CHECK (public.is_current_user_admin());

-- Seed deposits for Henosh, Sinoj, Nithin
INSERT INTO public.security_deposits (member_id, deposit_amount)
SELECT id, 2000 FROM public.trip_members WHERE name IN ('Henosh', 'Sinoj', 'Nithin');

-- 6) Train Ticket Fares
CREATE TABLE public.train_ticket_fares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid NOT NULL UNIQUE REFERENCES public.trip_members(id) ON DELETE CASCADE,
  ekm_to_madgaon numeric NOT NULL DEFAULT 0,
  madgaon_to_ekm numeric NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.train_ticket_fares ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read train_ticket_fares" ON public.train_ticket_fares FOR SELECT USING (public.is_current_user_admin());
CREATE POLICY "Admin manage train_ticket_fares" ON public.train_ticket_fares FOR ALL USING (public.is_current_user_admin()) WITH CHECK (public.is_current_user_admin());

-- Seed fares for all members
INSERT INTO public.train_ticket_fares (member_id)
SELECT id FROM public.trip_members;

-- 7) Extra Expenses
CREATE TABLE public.extra_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_date date NOT NULL DEFAULT CURRENT_DATE,
  expense_type text NOT NULL DEFAULT 'Extra',
  description text,
  amount numeric NOT NULL DEFAULT 0,
  paid_by_member_id uuid REFERENCES public.trip_members(id) ON DELETE SET NULL,
  paid_by_label text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.extra_expenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read extra_expenses" ON public.extra_expenses FOR SELECT USING (public.is_current_user_admin());
CREATE POLICY "Admin manage extra_expenses" ON public.extra_expenses FOR ALL USING (public.is_current_user_admin()) WITH CHECK (public.is_current_user_admin());

-- 8) Trip Budget Items (new table, does NOT touch BudgetItems)
CREATE TABLE public.trip_budget_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name text NOT NULL,
  estimated_amount numeric NOT NULL DEFAULT 0,
  actual_amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Planned',
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.trip_budget_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read trip_budget_items" ON public.trip_budget_items FOR SELECT USING (public.is_current_user_admin());
CREATE POLICY "Admin manage trip_budget_items" ON public.trip_budget_items FOR ALL USING (public.is_current_user_admin()) WITH CHECK (public.is_current_user_admin());

-- 9) Admin Audit Log (new table, does NOT touch budget_audit_log)
CREATE TABLE public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  admin_identity text,
  action_type text NOT NULL,
  table_name text NOT NULL,
  record_id text,
  before_value jsonb,
  after_value jsonb
);
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read admin_audit_log" ON public.admin_audit_log FOR SELECT USING (public.is_current_user_admin());
CREATE POLICY "Admin insert admin_audit_log" ON public.admin_audit_log FOR INSERT WITH CHECK (public.is_current_user_admin());
-- Audit logs should not be updated or deleted
CREATE POLICY "Block audit_log updates" ON public.admin_audit_log FOR UPDATE USING (false);
CREATE POLICY "Block audit_log deletes" ON public.admin_audit_log FOR DELETE USING (false);
