-- Ek baar run karo: admin panel ke photo uploads ke liye public bucket banata hai.
-- Supabase → SQL Editor → paste → Run.

insert into storage.buckets (id, name, public)
values ('site-image', 'site-image', true)
on conflict (id) do update set public = true;
