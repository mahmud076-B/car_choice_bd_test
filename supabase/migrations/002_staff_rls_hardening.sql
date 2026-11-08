-- Car Choice BD — security hardening
-- 1. Staff allowlist: being "authenticated" is no longer enough for admin access.
-- 2. Public lead inserts are limited to sane, NEW-status rows.

-- ---------------------------------------------------------------------------
-- Staff allowlist
-- ---------------------------------------------------------------------------
create table if not exists public.staff_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz default now()
);

alter table public.staff_users enable row level security;

-- Runs as the table owner so RLS policies can call it without recursion.
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.staff_users s where s.user_id = auth.uid()
  );
$$;

revoke all on function public.is_staff() from public;
grant execute on function public.is_staff() to anon, authenticated;

drop policy if exists "Staff read own staff row" on public.staff_users;
create policy "Staff read own staff row"
  on public.staff_users for select
  using (user_id = auth.uid());

-- Seed the showroom admin account (no-op if the user does not exist yet).
insert into public.staff_users (user_id, email)
select id, email from auth.users
where lower(email) = 'admin.carchoicebd@gmail.com'
on conflict (user_id) do nothing;

-- ---------------------------------------------------------------------------
-- Replace "any authenticated user" staff policies with is_staff()
-- ---------------------------------------------------------------------------
drop policy if exists "Staff all vehicles" on public.vehicles;
create policy "Staff all vehicles"
  on public.vehicles for all
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "Staff all images" on public.vehicle_images;
create policy "Staff all images"
  on public.vehicle_images for all
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "Staff read inquiries" on public.inquiries;
create policy "Staff read inquiries"
  on public.inquiries for select
  using (public.is_staff());

drop policy if exists "Staff update inquiries" on public.inquiries;
create policy "Staff update inquiries"
  on public.inquiries for update
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "Staff delete inquiries" on public.inquiries;
create policy "Staff delete inquiries"
  on public.inquiries for delete
  using (public.is_staff());

drop policy if exists "Staff read preorders" on public.pre_order_requests;
create policy "Staff read preorders"
  on public.pre_order_requests for select
  using (public.is_staff());

drop policy if exists "Staff update preorders" on public.pre_order_requests;
create policy "Staff update preorders"
  on public.pre_order_requests for update
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "Staff delete preorders" on public.pre_order_requests;
create policy "Staff delete preorders"
  on public.pre_order_requests for delete
  using (public.is_staff());

drop policy if exists "Staff all delivered" on public.delivered_cars;
create policy "Staff all delivered"
  on public.delivered_cars for all
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "Staff all duty sheet" on public.duty_sheet_rows;
create policy "Staff all duty sheet"
  on public.duty_sheet_rows for all
  using (public.is_staff())
  with check (public.is_staff());

-- Storage: only staff may write to vehicle-media (public read stays).
drop policy if exists "Staff upload vehicle-media" on storage.objects;
create policy "Staff upload vehicle-media"
  on storage.objects for insert
  with check (bucket_id = 'vehicle-media' and public.is_staff());

drop policy if exists "Staff update vehicle-media" on storage.objects;
create policy "Staff update vehicle-media"
  on storage.objects for update
  using (bucket_id = 'vehicle-media' and public.is_staff());

drop policy if exists "Staff delete vehicle-media" on storage.objects;
create policy "Staff delete vehicle-media"
  on storage.objects for delete
  using (bucket_id = 'vehicle-media' and public.is_staff());

-- ---------------------------------------------------------------------------
-- Public lead inserts: NEW status only, bounded lengths, empty honeypot
-- ---------------------------------------------------------------------------
drop policy if exists "Public insert inquiries" on public.inquiries;
create policy "Public insert inquiries"
  on public.inquiries for insert
  with check (
    status = 'NEW'
    and char_length(name) between 2 and 120
    and char_length(message) between 1 and 5000
    and (phone is null or char_length(phone) <= 20)
    and (email is null or char_length(email) <= 200)
    and (subject is null or char_length(subject) <= 200)
    and (chassis is null or char_length(chassis) <= 40)
    and (vehicle_slug is null or char_length(vehicle_slug) <= 200)
    and (website_url_hp is null or website_url_hp = '')
  );

drop policy if exists "Public insert preorders" on public.pre_order_requests;
create policy "Public insert preorders"
  on public.pre_order_requests for insert
  with check (
    status = 'NEW'
    and char_length(name) between 2 and 120
    and char_length(phone) between 10 and 20
    and (email is null or char_length(email) <= 200)
    and (preferred_make is null or char_length(preferred_make) <= 80)
    and (preferred_model is null or char_length(preferred_model) <= 80)
    and (notes is null or char_length(notes) <= 3000)
    and (year_min is null or year_min between 1980 and 2100)
    and (year_max is null or year_max between 1980 and 2100)
    and (budget_bdt is null or (budget_bdt >= 0 and budget_bdt < 1000000000))
    and (website_url_hp is null or website_url_hp = '')
  );

