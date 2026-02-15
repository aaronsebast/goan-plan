
-- Create BudgetItems table
CREATE TABLE public."BudgetItems" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  category text,
  title text,
  amount numeric DEFAULT 0,
  paid_by text,
  notes text,
  trip_id text
);

ALTER TABLE public."BudgetItems" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin read budget items" ON public."BudgetItems" FOR SELECT
  USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())::text));
CREATE POLICY "Admin insert budget items" ON public."BudgetItems" FOR INSERT
  WITH CHECK (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())::text));
CREATE POLICY "Admin update budget items" ON public."BudgetItems" FOR UPDATE
  USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())::text));
CREATE POLICY "Admin delete budget items" ON public."BudgetItems" FOR DELETE
  USING (public.is_admin_email((SELECT email FROM auth.users WHERE id = auth.uid())::text));

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public."BudgetItems";
ALTER PUBLICATION supabase_realtime ADD TABLE public.travel_id_submissions;
