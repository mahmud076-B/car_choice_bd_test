-- Car Choice BD — Complete Production Schema
-- Apply via Supabase SQL editor or CLI: npx supabase db push --db-url "..."

create extension if not exists "pgcrypto";

do $$ begin
  create type inventory_status as enum (
    'READY_STOCK',
    'PORT_STOCK',
    'IN_TRANSIT',
    'RESERVED',
    'SOLD'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type publication_status as enum (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type price_display_mode as enum (
    'EXACT',
    'CALL_FOR_PRICE',
    'UPON_REQUEST'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type inquiry_type as enum (
    'VEHICLE_INQUIRY',
    'AUCTION_VERIFY',
    'GENERAL_CONTACT'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type inquiry_status as enum (
    'NEW',
    'IN_PROGRESS',
    'CLOSED'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  make text not null,
  model text not null,
  package text default '',
  year int not null,
  grade text default '',
  mileage int default 0,
  engine_cc int default 0,
  fuel_type text default 'Petrol',
  transmission text default '',
  drive text default '2WD',
  body_type text default 'Sedan',
  color text default '',
  chassis text default '',
  inventory_status inventory_status not null default 'READY_STOCK',
  status_label text,
  location text default 'Rajshahi Showroom',
  price_bdt numeric,
  price_display text,
  price_display_mode price_display_mode not null default 'CALL_FOR_PRICE',
  is_negotiable boolean default true,
  is_featured boolean default false,
  publication_status publication_status not null default 'DRAFT',
  auction_sheet_available boolean default false,
  features text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.vehicle_images (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  url text not null,
  alt text,
  sort_order int default 0,
  is_cover boolean default false,
  is_auction_sheet boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_type inquiry_type not null default 'GENERAL_CONTACT',
  status inquiry_status not null default 'NEW',
  name text not null,
  phone text,
  email text,
  subject text,
  message text not null,
  chassis text,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  vehicle_slug text,
  website_url_hp text,
  created_at timestamptz default now()
);

create table if not exists public.pre_order_requests (
  id uuid primary key default gen_random_uuid(),
  status inquiry_status not null default 'NEW',
  name text not null,
  phone text not null,
  email text,
  preferred_make text,
  preferred_model text,
  year_min int,
  year_max int,
  budget_bdt numeric,
  notes text,
  website_url_hp text,
  created_at timestamptz default now()
);

create table if not exists public.delivered_cars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  model_year text,
  image_url text not null,
  caption text,
  customer_consent boolean default false,
  is_published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.duty_sheet_rows (
  id text primary key,
  brand text not null,
  model text not null,
  chassis text not null,
  year int not null,
  cc int not null,
  duty_bdt numeric not null default 0,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create index if not exists vehicles_pub_idx on public.vehicles (publication_status, is_featured);
create index if not exists vehicles_slug_idx on public.vehicles (slug);
create index if not exists vehicle_images_vehicle_idx on public.vehicle_images (vehicle_id);
create index if not exists duty_sheet_lookup_idx on public.duty_sheet_rows (brand, model, chassis, year, cc);

alter table public.vehicles enable row level security;
alter table public.vehicle_images enable row level security;
alter table public.inquiries enable row level security;
alter table public.pre_order_requests enable row level security;
alter table public.delivered_cars enable row level security;
alter table public.duty_sheet_rows enable row level security;

-- Drop existing policies safely so script is idempotent
drop policy if exists "Public read published vehicles" on public.vehicles;
drop policy if exists "Public read vehicle images" on public.vehicle_images;
drop policy if exists "Public read delivered" on public.delivered_cars;
drop policy if exists "Public read duty sheet" on public.duty_sheet_rows;
drop policy if exists "Public insert inquiries" on public.inquiries;
drop policy if exists "Public insert preorders" on public.pre_order_requests;
drop policy if exists "Staff all vehicles" on public.vehicles;
drop policy if exists "Staff all images" on public.vehicle_images;
drop policy if exists "Staff read inquiries" on public.inquiries;
drop policy if exists "Staff update inquiries" on public.inquiries;
drop policy if exists "Staff delete inquiries" on public.inquiries;
drop policy if exists "Staff read preorders" on public.pre_order_requests;
drop policy if exists "Staff update preorders" on public.pre_order_requests;
drop policy if exists "Staff delete preorders" on public.pre_order_requests;
drop policy if exists "Staff all delivered" on public.delivered_cars;
drop policy if exists "Staff all duty sheet" on public.duty_sheet_rows;

-- Public read published vehicles + images + delivered cars + duty sheet
create policy "Public read published vehicles"
  on public.vehicles for select
  using (publication_status = 'PUBLISHED');

create policy "Public read vehicle images"
  on public.vehicle_images for select
  using (
    exists (
      select 1 from public.vehicles v
      where v.id = vehicle_id and v.publication_status = 'PUBLISHED'
    )
  );

create policy "Public read delivered"
  on public.delivered_cars for select
  using (is_published = true);

create policy "Public read duty sheet"
  on public.duty_sheet_rows for select
  using (true);

-- Public insert leads (anon)
create policy "Public insert inquiries"
  on public.inquiries for insert
  with check (true);

create policy "Public insert preorders"
  on public.pre_order_requests for insert
  with check (true);

-- Staff full access (authenticated)
create policy "Staff all vehicles"
  on public.vehicles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Staff all images"
  on public.vehicle_images for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Staff read inquiries"
  on public.inquiries for select
  using (auth.role() = 'authenticated');

create policy "Staff update inquiries"
  on public.inquiries for update
  using (auth.role() = 'authenticated');

create policy "Staff delete inquiries"
  on public.inquiries for delete
  using (auth.role() = 'authenticated');

create policy "Staff read preorders"
  on public.pre_order_requests for select
  using (auth.role() = 'authenticated');

create policy "Staff update preorders"
  on public.pre_order_requests for update
  using (auth.role() = 'authenticated');

create policy "Staff delete preorders"
  on public.pre_order_requests for delete
  using (auth.role() = 'authenticated');

create policy "Staff all delivered"
  on public.delivered_cars for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Staff all duty sheet"
  on public.duty_sheet_rows for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Create public Storage bucket `vehicle-media` automatically
insert into storage.buckets (id, name, public)
values ('vehicle-media', 'vehicle-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read vehicle-media" on storage.objects;
drop policy if exists "Staff upload vehicle-media" on storage.objects;
drop policy if exists "Staff update vehicle-media" on storage.objects;
drop policy if exists "Staff delete vehicle-media" on storage.objects;

create policy "Public read vehicle-media"
  on storage.objects for select
  using (bucket_id = 'vehicle-media');

create policy "Staff upload vehicle-media"
  on storage.objects for insert
  with check (bucket_id = 'vehicle-media' and auth.role() = 'authenticated');

create policy "Staff update vehicle-media"
  on storage.objects for update
  using (bucket_id = 'vehicle-media' and auth.role() = 'authenticated');

create policy "Staff delete vehicle-media"
  on storage.objects for delete
  using (bucket_id = 'vehicle-media' and auth.role() = 'authenticated');
