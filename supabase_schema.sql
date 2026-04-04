-- ============================================================
-- MBJARE INFOTECH — COMPLETE FRESH SCHEMA v3
-- ============================================================
-- HOW TO USE:
-- 1. Go to Supabase Dashboard → SQL Editor
-- 2. Paste this ENTIRE file and click "Run"
-- 3. Done! All tables, RLS policies, triggers created.
-- ============================================================

-- ── STEP 1: DROP ALL OLD TABLES (fresh start) ─────────────
DROP TABLE IF EXISTS ticket_messages CASCADE;
DROP TABLE IF EXISTS tickets         CASCADE;
DROP TABLE IF EXISTS leads           CASCADE;
DROP TABLE IF EXISTS newsletter      CASCADE;
DROP TABLE IF EXISTS testimonials    CASCADE;
DROP TABLE IF EXISTS services        CASCADE;
DROP TABLE IF EXISTS portfolio       CASCADE;
DROP TABLE IF EXISTS articles        CASCADE;
DROP TABLE IF EXISTS profiles        CASCADE;

-- ── STEP 2: DROP OLD FUNCTIONS & TRIGGERS ─────────────────
DROP FUNCTION IF EXISTS handle_new_user()   CASCADE;
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;

-- ============================================================
-- STEP 3: CREATE TABLES
-- ============================================================

-- ── PROFILES (linked to Supabase auth.users) ──────────────
CREATE TABLE profiles (
  id            UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name     TEXT,
  email         TEXT,
  phone         TEXT,
  avatar_url    TEXT,
  role          TEXT        DEFAULT 'user' CHECK (role IN ('admin','user')),
  company_name  TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── LEADS (Contact Form submissions) ──────────────────────
CREATE TABLE leads (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  phone      TEXT,
  service    TEXT,
  budget     TEXT,
  message    TEXT,
  source     TEXT        DEFAULT 'website',
  status     TEXT        DEFAULT 'new' CHECK (status IN ('new','contacted','converted','closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── SUPPORT TICKETS ────────────────────────────────────────
CREATE TABLE tickets (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL,
  category    TEXT        DEFAULT 'general' CHECK (category IN ('general','billing','technical','design','other')),
  priority    TEXT        DEFAULT 'medium'  CHECK (priority  IN ('low','medium','high','urgent')),
  status      TEXT        DEFAULT 'open'    CHECK (status    IN ('open','in_progress','resolved','closed')),
  assigned_to UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── TICKET MESSAGES ────────────────────────────────────────
CREATE TABLE ticket_messages (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id   UUID        REFERENCES tickets(id) ON DELETE CASCADE NOT NULL,
  sender_id   UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  message     TEXT        NOT NULL,
  is_internal BOOLEAN     DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── TESTIMONIALS ───────────────────────────────────────────
CREATE TABLE testimonials (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  role        TEXT,
  company     TEXT,
  avatar      TEXT,
  message     TEXT        NOT NULL,
  rating      INTEGER     DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  active      BOOLEAN     DEFAULT TRUE,
  sort_order  INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── SERVICES ───────────────────────────────────────────────
CREATE TABLE services (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  subtitle    TEXT,
  description TEXT,
  icon        TEXT        DEFAULT 'Globe',
  features    TEXT[],
  price       TEXT,
  timeline    TEXT,
  accent      TEXT        DEFAULT '#009688',
  active      BOOLEAN     DEFAULT TRUE,
  sort_order  INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── PORTFOLIO ──────────────────────────────────────────────
CREATE TABLE portfolio (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  description TEXT,
  image       TEXT,
  category    TEXT,
  tags        TEXT[],
  url         TEXT,
  result      TEXT,
  metric      TEXT,
  emoji       TEXT        DEFAULT '🚀',
  accent      TEXT        DEFAULT '#009688',
  active      BOOLEAN     DEFAULT TRUE,
  sort_order  INTEGER     DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── NEWSLETTER ─────────────────────────────────────────────
CREATE TABLE newsletter (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email         TEXT        UNIQUE NOT NULL,
  active        BOOLEAN     DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── ARTICLES ───────────────────────────────────────────────
CREATE TABLE articles (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  slug        TEXT        UNIQUE NOT NULL,
  excerpt     TEXT,
  content     TEXT,
  cover_image TEXT,
  tags        TEXT[],
  published   BOOLEAN     DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STEP 4: ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads           ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets         ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials    ENABLE ROW LEVEL SECURITY;
ALTER TABLE services        ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio       ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter      ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles        ENABLE ROW LEVEL SECURITY;

-- ── PROFILES policies ──────────────────────────────────────
CREATE POLICY "profiles_select_own"   ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own"   ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own"   ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_select_admin" ON profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

-- ── LEADS policies ─────────────────────────────────────────
-- Public INSERT so contact form works without login
CREATE POLICY "leads_insert_public"   ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "leads_select_admin"    ON leads FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "leads_update_admin"    ON leads FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── TICKETS policies ───────────────────────────────────────
CREATE POLICY "tickets_insert_user"   ON tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tickets_select_own"    ON tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "tickets_select_admin"  ON tickets FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "tickets_update_admin"  ON tickets FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── TICKET MESSAGES policies ───────────────────────────────
CREATE POLICY "tmsg_select_own"   ON ticket_messages FOR SELECT
  USING (EXISTS (SELECT 1 FROM tickets WHERE tickets.id = ticket_id AND tickets.user_id = auth.uid()));
CREATE POLICY "tmsg_select_admin" ON ticket_messages FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "tmsg_insert_auth"  ON ticket_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- ── TESTIMONIALS policies ──────────────────────────────────
CREATE POLICY "testimonials_public"   ON testimonials FOR SELECT USING (active = true);
CREATE POLICY "testimonials_admin"    ON testimonials FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── SERVICES policies ──────────────────────────────────────
CREATE POLICY "services_public"       ON services FOR SELECT USING (active = true);
CREATE POLICY "services_admin"        ON services FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── PORTFOLIO policies ─────────────────────────────────────
CREATE POLICY "portfolio_public"      ON portfolio FOR SELECT USING (active = true);
CREATE POLICY "portfolio_admin"       ON portfolio FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── NEWSLETTER policies ────────────────────────────────────
-- Public INSERT so footer subscribe works without login
CREATE POLICY "newsletter_insert_public" ON newsletter FOR INSERT WITH CHECK (true);
CREATE POLICY "newsletter_select_admin"  ON newsletter FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── ARTICLES policies ──────────────────────────────────────
CREATE POLICY "articles_public"       ON articles FOR SELECT USING (published = true);
CREATE POLICY "articles_admin"        ON articles FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- STEP 5: FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-create profile on first Google OAuth sign-up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO profiles (id, full_name, email, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    'user'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER tickets_updated_at
  BEFORE UPDATE ON tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- STEP 6: SEED DATA
-- ============================================================

INSERT INTO testimonials (name, role, company, message, rating, sort_order) VALUES
  ('Rahul Sharma', 'Founder',  'ShopEasy',         'Website launched in 10 days. Sales tripled in 30 days. Mbjare literally changed my business.', 5, 1),
  ('Priya Verma',  'Owner',    'Beauty Hub',        'WhatsApp bot handles 80% of my customer queries. I gained 15 hours a week back.',               5, 2),
  ('Amit Tiwari',  'Manager',  'TechCorp',          'Google Sheet automation saved my team 20+ hours every week. Worth every rupee.',                 5, 3),
  ('Sneha Gupta',  'Director', 'Gupta Enterprises', 'They don''t just build — they think about growth. Best tech partner we''ve worked with.',        5, 4),
  ('Vikram Singh', 'CEO',      'StartupHub CG',     'World-class quality at startup-friendly prices. I keep coming back for every project.',           5, 5),
  ('Megha Joshi',  'Founder',  'TalentBridge',      'Our app went from idea to Play Store in 6 weeks. Mbjare team is absolutely incredible.',          5, 6);

INSERT INTO services (title, subtitle, description, icon, price, timeline, accent, sort_order) VALUES
  ('Website Development',     'Beautiful. Fast. Converting.',  'Custom websites with React & Next.js — blazing fast, SEO-optimized, and built to convert.',    'Globe',           'Starting ₹9,999',   '1–2 weeks', '#0891b2', 1),
  ('WhatsApp Automation',     'Automate. Engage. Convert.',    'WhatsApp Business API to automate support, send updates, qualify leads — all on autopilot.',   'MessageSquare',   'Starting ₹4,999',   '3–5 days',  '#009688', 2),
  ('App Development',         'iOS & Android. One Codebase.',  'Cross-platform apps with React Native and Flutter. From MVP to full product in weeks.',        'Smartphone',      'Starting ₹24,999',  '4–6 weeks', '#7c3aed', 3),
  ('Google Sheet Automation', 'Kill Manual Work. Forever.',    'Custom Google Apps Script automations that connect sheets to any API.',                        'FileSpreadsheet', 'Starting ₹2,999',   '2–4 days',  '#d97706', 4),
  ('Social Media Management', 'Grow Your Audience. Daily.',    'Strategic content, creatives & ad campaigns to grow your brand across all platforms.',         'Share2',          'Starting ₹5,999/mo','Monthly',   '#db2777', 5),
  ('Graphic Design & Branding','Look Like a Million Bucks.',   'Logo, brand kits, UI/UX & marketing assets that make you look premium and trustworthy.',      'Palette',         'Starting ₹1,999',   '3–5 days',  '#ea580c', 6);

INSERT INTO portfolio (title, description, category, tags, result, metric, emoji, accent, sort_order) VALUES
  ('ShopEasy E-Commerce',    'Full-stack shopping portal with Razorpay, order tracking & admin dashboard.',             'Web Development', ARRAY['React','Node.js','Razorpay'],  '3× Sales Growth',    '+218% revenue in 30 days', '🛒','#0891b2', 1),
  ('Restaurant Ordering App','Online food ordering with WhatsApp notifications and live kitchen tracking.',              'Mobile App',      ARRAY['React Native','WhatsApp API'], '500+ Daily Orders',  'Reduced wait time 60%',    '🍽️','#d97706', 2),
  ('HR Automation Suite',    'Automated attendance, payroll & reporting via Google Sheets for 50-person team.',         'Automation',      ARRAY['Apps Script','Gmail API'],      '20 hrs/week Saved',  'Zero manual entry',        '⚡','#009688', 3),
  ('Real Estate Portal',     'Property listing with lead capture, CRM, and WhatsApp follow-up sequences.',             'Web Development', ARRAY['React','Supabase','WhatsApp'],  '200+ Leads/Month',   '4.2× lead conversion',     '🏠','#7c3aed', 4),
  ('Medical Clinic Website', 'Doctor appointment booking with SMS reminders and patient portal.',                       'Web Development', ARRAY['React','Node.js','SMS API'],    '150+ Bookings/Month','0 missed appointments',    '🏥','#db2777', 5),
  ('WhatsApp Lead Bot',      'AI-powered bot that captures, scores, and books appointments automatically.',             'Automation',      ARRAY['WhatsApp API','Google Sheets'], '80% Auto-Qualified', '3× faster lead response',  '🤖','#009688', 6);

-- ============================================================
-- STEP 7: MAKE YOURSELF ADMIN
-- ============================================================
-- IMPORTANT: After your FIRST Google login, run this in SQL Editor:
--
-- UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
--
-- ============================================================
