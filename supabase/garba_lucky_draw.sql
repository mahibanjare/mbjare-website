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


-- -----------------------------------------------------
-- 8) TELEGRAM ALERT – har nayi entry Mahendra ko Telegram par
--    (TaskJare bot: telegram_outbox → telegram-dispatch cron har minute bhejta hai)
-- -----------------------------------------------------
create or replace function public.garba_tg_esc(t text)
returns text
language sql
immutable
set search_path = ''
as $$ select replace(replace(replace(coalesce(t, ''), '&', '&amp;'), '<', '&lt;'), '>', '&gt;') $$;

create or replace function public.garba_notify_telegram()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_chat  text;
  v_total bigint;
  v_text  text;
begin
  -- Mahendra Banjare ki TaskJare profile; relink karne par naya chat id apne aap use hoga
  select telegram_chat_id into v_chat
  from public.profiles
  where id = '08350930-f860-4a7e-9a1b-40ab0465c7e1';

  if v_chat is null then
    return new;  -- Telegram link nahi hai to entry fail nahi honi chahiye
  end if;

  select count(*) into v_total from public.garba_lucky_draw;

  v_text := concat_ws(E'\n',
    '🎉 <b>Garba Lucky Draw – nayi entry</b>',
    '',
    '🎟 Ticket: <b>' || public.garba_tg_esc(new.ticket) || '</b>',
    '👤 ' || public.garba_tg_esc(new.name),
    '📞 +91 ' || public.garba_tg_esc(new.mobile),
    case when new.has_business
      then '🏪 ' || public.garba_tg_esc(new.business_name) || ' (' || public.garba_tg_esc(new.business_type) || ')'
      else '🙅 Business nahi hai'
    end,
    case when not new.has_business and (new.ref_name is not null or new.ref_mobile is not null)
      then '🎁 Referral: ' || public.garba_tg_esc(coalesce(new.ref_name, '—'))
           || coalesce(' · +91 ' || public.garba_tg_esc(new.ref_mobile), '')
    end,
    '📍 Source: ' || public.garba_tg_esc(coalesce(new.source, '—')),
    '🕒 ' || to_char(new.created_at at time zone 'Asia/Kolkata', 'DD Mon, HH12:MI AM'),
    '',
    '📊 Total entries: <b>' || v_total || '</b>'
  );

  -- profile_id null rakha hai: delivery fail ho to dispatch Mahendra ka TaskJare link na hataye
  insert into public.telegram_outbox (profile_id, chat_id, kind, payload)
  values (null, v_chat, 'garba_entry', jsonb_build_object('text', v_text));

  return new;
exception when others then
  -- Alert me koi gadbad ho to bhi user ki entry save honi chahiye
  raise warning 'garba_notify_telegram failed: %', sqlerrm;
  return new;
end;
$$;

revoke all on function public.garba_notify_telegram() from public, anon, authenticated;

drop trigger if exists garba_notify_telegram on public.garba_lucky_draw;
create trigger garba_notify_telegram
  after insert on public.garba_lucky_draw
  for each row execute function public.garba_notify_telegram();


-- -----------------------------------------------------
-- 9) DRAW + PUBLIC RESULT (admin: /admin/garba, public: /garba/winner)
--    Entries close 20 Oct 2026, 11:59 AM IST (enforced here too)
-- -----------------------------------------------------
create or replace function public.garba_draw_entries()
returns table (ticket text, name text, business_name text)
language sql stable security definer set search_path = ''
as $$
  select g.ticket, g.name, coalesce(g.business_name, g.ref_name, '')
  from public.garba_lucky_draw g order by g.id
$$;
revoke all on function public.garba_draw_entries() from public;
grant execute on function public.garba_draw_entries() to anon, authenticated;

create table if not exists public.garba_draw_result (
  id               int primary key default 1 check (id = 1),
  winner_ticket    text not null,
  winner_name      text not null,
  winner_business  text,
  seal_hash        text not null,
  seal_reveal      text not null,   -- "ticket|name|business|salt"; sha256(seal_reveal) = seal_hash
  total_entries    int  not null,
  drawn_at         timestamptz not null default now()
);
alter table public.garba_draw_result enable row level security;  -- written only with the service-role key

create or replace function public.garba_public_result()
returns table (winner_ticket text, winner_name text, winner_business text, seal_hash text, seal_reveal text, total_entries int, drawn_at timestamptz)
language sql stable security definer set search_path = ''
as $$
  select r.winner_ticket, r.winner_name, r.winner_business, r.seal_hash, r.seal_reveal, r.total_entries, r.drawn_at
  from public.garba_draw_result r where r.id = 1
$$;
revoke all on function public.garba_public_result() from public;
grant execute on function public.garba_public_result() to anon, authenticated;

drop policy if exists "public can submit entry" on public.garba_lucky_draw;
create policy "public can submit entry"
  on public.garba_lucky_draw for insert
  to anon, authenticated
  with check (
    consent = true
    and created_at <= now() + interval '1 minute'
    and now() <= timestamptz '2026-10-20 11:59:59+05:30'
  );

-- Re-draw karna ho (winner ne claim nahi kiya): public result hatane ke liye
-- delete from public.garba_draw_result where id = 1;
