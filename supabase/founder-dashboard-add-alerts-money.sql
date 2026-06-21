-- Paste this entire file into Supabase SQL Editor if you already ran the original dashboard SQL.

CREATE TABLE IF NOT EXISTS founder_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'Other' CHECK (type IN ('Follow-Up', 'Business', 'App', 'Website', 'Money', 'Personal', 'Other')),
  priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
  status TEXT NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'Completed', 'Dismissed')),
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS founder_money_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  current_net_worth NUMERIC(14,2) NOT NULL DEFAULT 0,
  cash NUMERIC(14,2) NOT NULL DEFAULT 0,
  investments NUMERIC(14,2) NOT NULL DEFAULT 0,
  business_app_revenue NUMERIC(14,2) NOT NULL DEFAULT 0,
  business_expenses NUMERIC(14,2) NOT NULL DEFAULT 0,
  monthly_profit NUMERIC(14,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS founder_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  merchant TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Other' CHECK (category IN ('Ads', 'Software', 'App Store', 'Domain', 'Hosting', 'Design', 'Contractor', 'Equipment', 'Other')),
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  description TEXT,
  project TEXT NOT NULL DEFAULT 'Other' CHECK (project IN ('RepQuest', 'Sequoia Apps', 'Personal Website', 'Other')),
  recurring BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_founder_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS founder_alerts_updated_at ON founder_alerts;
CREATE TRIGGER founder_alerts_updated_at BEFORE UPDATE ON founder_alerts
FOR EACH ROW EXECUTE FUNCTION update_founder_updated_at();

DROP TRIGGER IF EXISTS founder_money_snapshots_updated_at ON founder_money_snapshots;
CREATE TRIGGER founder_money_snapshots_updated_at BEFORE UPDATE ON founder_money_snapshots
FOR EACH ROW EXECUTE FUNCTION update_founder_updated_at();

DROP TRIGGER IF EXISTS founder_expenses_updated_at ON founder_expenses;
CREATE TRIGGER founder_expenses_updated_at BEFORE UPDATE ON founder_expenses
FOR EACH ROW EXECUTE FUNCTION update_founder_updated_at();

ALTER TABLE founder_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE founder_money_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE founder_expenses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Founder can manage alerts" ON founder_alerts;
CREATE POLICY "Founder can manage alerts" ON founder_alerts FOR ALL TO authenticated
USING (user_id = auth.uid() AND auth.jwt() ->> 'email' = 'dylanknapp1888@gmail.com')
WITH CHECK (user_id = auth.uid() AND auth.jwt() ->> 'email' = 'dylanknapp1888@gmail.com');

DROP POLICY IF EXISTS "Founder can manage money snapshots" ON founder_money_snapshots;
CREATE POLICY "Founder can manage money snapshots" ON founder_money_snapshots FOR ALL TO authenticated
USING (user_id = auth.uid() AND auth.jwt() ->> 'email' = 'dylanknapp1888@gmail.com')
WITH CHECK (user_id = auth.uid() AND auth.jwt() ->> 'email' = 'dylanknapp1888@gmail.com');

DROP POLICY IF EXISTS "Founder can manage expenses" ON founder_expenses;
CREATE POLICY "Founder can manage expenses" ON founder_expenses FOR ALL TO authenticated
USING (user_id = auth.uid() AND auth.jwt() ->> 'email' = 'dylanknapp1888@gmail.com')
WITH CHECK (user_id = auth.uid() AND auth.jwt() ->> 'email' = 'dylanknapp1888@gmail.com');

CREATE INDEX IF NOT EXISTS founder_alerts_user_due_idx ON founder_alerts(user_id, due_date);
CREATE INDEX IF NOT EXISTS founder_expenses_user_date_idx ON founder_expenses(user_id, date DESC);
