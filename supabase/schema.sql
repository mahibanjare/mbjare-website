-- Mbjare InfoTech — content backend schema
-- Run this once in your Supabase project: SQL Editor → paste → Run.
-- Then fill .env.local:
--   NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
--   SUPABASE_SERVICE_ROLE_KEY=<service_role key from Project Settings → API>
--   ADMIN_PASSWORD=<a strong password for /admin>
--
-- Tables start EMPTY — the site keeps using the checked-in content until you
-- add rows from /admin. Column names match the code exactly (camelCase quoted).

create table if not exists mbjare_services (
  id uuid primary key default gen_random_uuid(),
  sort int default 0,
  slug text unique not null,
  icon text not null default 'Globe',
  title text not null,
  subtitle text not null default '',
  "desc" text not null default '',
  image text not null default '',
  features jsonb not null default '[]',
  price text not null default '',
  timeline text not null default '',
  badge text,
  related jsonb not null default '[]'
);

create table if not exists mbjare_packages (
  id uuid primary key default gen_random_uuid(),
  sort int default 0,
  slug text unique not null,
  icon text not null default 'Rocket',
  name text not null,
  tagline text not null default '',
  "forWho" text not null default '',
  includes jsonb not null default '[]',
  outcome text not null default '',
  price text not null default '',
  "priceNote" text,
  timeline text not null default '',
  badge text,
  proof jsonb not null default '{"client":"","url":"","image":"","note":""}',
  services jsonb not null default '[]'
);

create table if not exists mbjare_projects (
  id uuid primary key default gen_random_uuid(),
  sort int default 0,
  title text not null,
  url text,
  category text not null default 'Websites',
  "desc" text not null default '',
  deliverables jsonb not null default '[]',
  tags jsonb not null default '[]',
  year text not null default '',
  image text
);

create table if not exists mbjare_testimonials (
  id uuid primary key default gen_random_uuid(),
  sort int default 0,
  name text not null,
  role text not null default '',
  msg text not null default '',
  rating int not null default 5
);

create table if not exists mbjare_faqs (
  id uuid primary key default gen_random_uuid(),
  sort int default 0,
  q text not null,
  a text not null default ''
);

-- Lock everything down: no public access. The site + admin panel use the
-- service-role key server-side, which bypasses RLS.
alter table mbjare_services enable row level security;
alter table mbjare_packages enable row level security;
alter table mbjare_projects enable row level security;
alter table mbjare_testimonials enable row level security;
alter table mbjare_faqs enable row level security;
