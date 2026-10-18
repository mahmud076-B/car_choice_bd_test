-- Optional seed — run after 001_initial_schema.sql
-- Uses public vehicle image paths hosted on the Next.js site for demo.

insert into public.vehicles (
  slug, make, model, package, year, grade, mileage, engine_cc, fuel_type,
  transmission, drive, body_type, color, chassis, inventory_status, status_label,
  location, price_bdt, price_display, price_display_mode, is_negotiable, is_featured,
  publication_status, auction_sheet_available, features
) values
(
  'toyota-harrier-z-leather-package-2024',
  'Toyota', 'Harrier', 'Z Leather Package', 2024, '5.0 / A', 12400, 2000, 'Hybrid',
  'e-CVT', '2WD', 'SUV / Crossover', 'Pearl White Crystal Shine', 'AXUH80-1094821',
  'READY_STOCK', 'Ready in Showroom', 'Rajshahi Showroom', 8450000, '৳ 84,50,000',
  'EXACT', true, true, 'PUBLISHED', true,
  array['Panoramaroof','JBL Premium Sound','360 Panoramic View','Toyota Safety Sense']
)
on conflict (slug) do nothing;
