
CREATE TABLE public.sponsor_expenses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  spender_name text NOT NULL,
  expense_date date NOT NULL DEFAULT CURRENT_DATE,
  reason text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  category text DEFAULT 'Misc',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.sponsor_expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin read sponsor_expenses" ON public.sponsor_expenses FOR SELECT USING (is_current_user_admin());
CREATE POLICY "Admin manage sponsor_expenses" ON public.sponsor_expenses FOR ALL USING (is_current_user_admin()) WITH CHECK (is_current_user_admin());
