-- Mbjare InfoTech — Client Help-Desk system
-- Supabase → SQL Editor → paste → Run.
--
-- mbjare_clients : client login accounts (admin banata hai)
-- mbjare_tickets : help tickets (client raise karta hai, Mbjare resolve karta hai)

create table if not exists mbjare_clients (
  id uuid primary key default gen_random_uuid(),
  sort int default 0,
  name text not null,
  company text default '',
  email text unique not null,          -- login id
  password text not null,              -- login password (server-side only padha jata hai)
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists mbjare_tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_no bigint generated always as identity,   -- human-readable #
  client_id uuid references mbjare_clients(id) on delete cascade,
  client_name text default '',         -- denormalized (admin list me dikhane ke liye)
  subject text not null,
  category text default 'General',     -- kaunsi service se related
  priority text default 'Medium',      -- Low / Medium / High
  description text default '',
  status text default 'Open',          -- Open / In Progress / Resolved
  assigned_to text default '',         -- Mbjare team member
  resolution text default '',          -- resolve hone pe note
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists mbjare_tickets_client_idx on mbjare_tickets(client_id);

-- updated_at auto-refresh on every change
create or replace function mbjare_touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists mbjare_tickets_touch on mbjare_tickets;
create trigger mbjare_tickets_touch
  before update on mbjare_tickets
  for each row execute function mbjare_touch_updated_at();

-- Lock down: only the service-role key (server-side) can read/write.
alter table mbjare_clients enable row level security;
alter table mbjare_tickets enable row level security;

-- Optional: ek test client bana lo (password badal lena)
-- insert into mbjare_clients (name, company, email, password)
-- values ('Test Client', 'Test Co', 'client@example.com', 'test1234');
