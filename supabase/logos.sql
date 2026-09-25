-- Ek baar run karo: homepage + portfolio ki "clients" logo strip ke liye table.
-- Supabase → SQL Editor → paste → Run. (Logo uploads 'site-image' bucket me jaate hain — storage.sql)

create table if not exists mbjare_logos (
  id uuid primary key default gen_random_uuid(),
  sort int default 0,
  name text not null,
  logo text,
  url text
);

alter table mbjare_logos enable row level security;
