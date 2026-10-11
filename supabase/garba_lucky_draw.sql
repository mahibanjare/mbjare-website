-- =====================================================
-- MBJARE Garba Lucky Draw - Supabase SQL
-- Supabase > SQL Editor mein paste karke Run karein
-- =====================================================


-- -----------------------------------------------------
-- 1) TABLE BANANA (sirf ek baar run karein)
-- -----------------------------------------------------
create table if not exists public.garba_lucky_draw (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  ticket        text not null unique,
  name          text not null check (char_length(name) between 2 and 60),
  mobile        text not null unique check (mobile ~ '^[6-9][0-9]{9}$'),
  has_business  boolean not null,
  business_name text check (char_length(business_name) <= 80),
  business_type text check (char_length(business_type) <= 60),
  ref_name      text check (char_length(ref_name) <= 80),
  ref_mobile    text check (ref_mobile is null or ref_mobile ~ '^[6-9][0-9]{9}$'),
  consent       boolean not null default false,
  source        text default 'garba-banner' check (char_length(source) <= 40),
  status        text not null default 'new'   -- new / called / interested / won
);

alter table public.garba_lucky_draw enable row level security;

-- Form sirf nayi entry daal sakta hai.
-- Public key se koi bhi entries padh / badal / delete nahi kar sakta.
create policy "public can submit entry"
  on public.garba_lucky_draw for insert
  to anon, authenticated
  with check (consent = true and created_at <= now() + interval '1 minute');

grant insert on public.garba_lucky_draw to anon, authenticated;


-- -----------------------------------------------------
-- 2) SAARI ENTRIES DEKHNA (business wale pehle)
-- -----------------------------------------------------
select ticket, name, mobile, has_business, business_name, business_type,
       ref_name, ref_mobile, source, status, created_at
from public.garba_lucky_draw
order by has_business desc, created_at;


-- -----------------------------------------------------
-- 3) KITNI ENTRIES AAYI
-- -----------------------------------------------------
select count(*)                              as total,
       count(*) filter (where has_business)  as business_wale,
       count(*) filter (where ref_mobile is not null) as referral_mile
from public.garba_lucky_draw;


-- -----------------------------------------------------
-- 4) KAHAN SE ENTRY AAYI (banner / instagram / whatsapp)
-- -----------------------------------------------------
select source, count(*) as entries
from public.garba_lucky_draw
group by source
order by entries desc;


-- -----------------------------------------------------
-- 5) REFERRAL LEADS (non-business logon ne jo business number diye)
-- -----------------------------------------------------
select name as diya_kisne, mobile as unka_number, ref_name, ref_mobile, created_at
from public.garba_lucky_draw
where ref_mobile is not null
order by created_at;


-- -----------------------------------------------------
-- 6) CALL STATUS UPDATE KARNA (ticket number badal kar chalayein)
-- -----------------------------------------------------
-- update public.garba_lucky_draw set status = 'called'     where ticket = 'G12345';
-- update public.garba_lucky_draw set status = 'interested' where ticket = 'G12345';


-- -----------------------------------------------------
-- 7) 20 OCT - RANDOM WINNER NIKAALNA (live screen record karein)
-- -----------------------------------------------------
select ticket, name, mobile, business_name
from public.garba_lucky_draw
order by random()
limit 1;

-- Winner ko mark karne ke liye (ticket number badal kar chalayein):
-- update public.garba_lucky_draw set status = 'won' where ticket = 'G12345';
