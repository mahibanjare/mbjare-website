-- Ek baar run karo: purani (bina prefix wali) tables ko mbjare_ prefix pe rename karta hai.
-- Supabase → SQL Editor → paste → Run.
-- RLS, primary keys aur data rename ke saath automatically carry hote hain.

alter table if exists services rename to mbjare_services;
alter table if exists packages rename to mbjare_packages;
alter table if exists projects rename to mbjare_projects;
alter table if exists testimonials rename to mbjare_testimonials;
alter table if exists faqs rename to mbjare_faqs;
