-- Car Choice BD — Initial Seed Data
-- Run after 001_initial_schema.sql

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
  array['Panoramaroof','JBL Premium Sound','360 Panoramic View','Toyota Safety Sense','Brown Dual-Tone Leather']
),
(
  'toyota-land-cruiser-prado-tx-l-package-2023',
  'Toyota', 'Land Cruiser Prado', 'TX L Package 7-Seater', 2023, '4.5 / A', 18500, 2800, 'Diesel',
  'Super ECT 6-Speed', '4WD', 'SUV / Crossover', 'Attitude Black Mica', 'GDJ150-0082711',
  'READY_STOCK', 'Ready in Showroom', 'Rajshahi Showroom', 14500000, '৳ 1,45,00,000',
  'EXACT', true, true, 'PUBLISHED', true,
  array['Sunroof','Beige Leather 7 Seats','Modellista Body Aero Kit','Crawl Control','Radar Cruise']
),
(
  'honda-vezel-ehev-z-package-2022',
  'Honda', 'Vezel', 'e:HEV Z Package', 2022, '5.0 / A', 14200, 1500, 'Hybrid',
  'e-CVT', '2WD', 'SUV / Crossover', 'Meteoroid Gray Metallic', 'RV5-1029482',
  'READY_STOCK', 'Ready in Showroom', 'Rajshahi Showroom', 3850000, '৳ 38,50,000',
  'EXACT', true, true, 'PUBLISHED', true,
  array['Hands-Free Power Tailgate','Honda SENSING','Half-Leather Seats','LED Active Cornering','Wireless Charging']
),
(
  'toyota-premio-f-ex-package-2021',
  'Toyota', 'Premio', 'F EX Package', 2021, '4.5 / B', 26000, 1500, 'Petrol',
  'Super CVT-i', '2WD', 'Sedan', 'Silver Metallic', 'NZT260-3129841',
  'READY_STOCK', 'Ready in Showroom', 'Rajshahi Showroom', null, 'Call for Price',
  'CALL_FOR_PRICE', true, true, 'PUBLISHED', true,
  array['Brown Interior','Push Start','Toyota Safety Sense C','Idling Stop','Original Alloy Wheels']
),
(
  'toyota-corolla-cross-z-hybrid-2023',
  'Toyota', 'Corolla Cross', 'Z Hybrid Package', 2023, '5.0 / S', 8900, 1800, 'Hybrid',
  'e-CVT', '2WD', 'SUV / Crossover', 'Platinum White Pearl', 'ZVG11-2018492',
  'PORT_STOCK', 'Arriving at Mongla Port', 'Mongla Port', 4250000, '৳ 42,50,000',
  'EXACT', true, true, 'PUBLISHED', true,
  array['Panoramic Roof','Full Digital Instrument Cluster','Power Driver Seat','Sequential LED','Blind Spot Monitor']
),
(
  'toyota-noah-sz-hybrid-7-seater-2022',
  'Toyota', 'Noah', 'S-Z Hybrid 7-Seater', 2022, '4.5 / A', 19400, 1800, 'Hybrid',
  'e-CVT', '2WD', 'Van / MPV', 'Sparkling Black Pearl', 'ZWR90W-0049182',
  'PORT_STOCK', 'Arrived at Port', 'Chattogram Port', 4600000, '৳ 46,00,000',
  'EXACT', true, true, 'PUBLISHED', true,
  array['Dual Power Sliding Doors','Captain Seats with Ottoman','Rear Entertainment System','Toyota Safety Sense 3.0','Apple CarPlay']
)
on conflict (slug) do nothing;

-- Seed cover images for vehicles that don't have images yet
insert into public.vehicle_images (vehicle_id, url, sort_order, is_cover, is_auction_sheet)
select v.id,
  case v.slug
    when 'toyota-harrier-z-leather-package-2024' then '/vehicles/harrier.jpg'
    when 'toyota-land-cruiser-prado-tx-l-package-2023' then '/vehicles/prado.jpg'
    when 'honda-vezel-ehev-z-package-2022' then '/vehicles/vezel.jpg'
    when 'toyota-premio-f-ex-package-2021' then '/vehicles/premio.jpg'
    when 'toyota-corolla-cross-z-hybrid-2023' then '/vehicles/corolla-cross.jpg'
    when 'toyota-noah-sz-hybrid-7-seater-2022' then '/vehicles/noah.jpg'
    else '/vehicles/harrier.jpg'
  end,
  0, true, false
from public.vehicles v
where not exists (
  select 1 from public.vehicle_images vi where vi.vehicle_id = v.id
);

-- Seed delivered cars if empty
insert into public.delivered_cars (title, model_year, image_url, caption, customer_consent, is_published, sort_order)
select * from (values
  ('Toyota Harrier Z', '2024', '/vehicles/harrier.jpg', 'Handed over in Rajshahi showroom', true, true, 1),
  ('Land Cruiser Prado TX', '2023', '/vehicles/prado.jpg', 'Family delivery — Drive Excellence', true, true, 2),
  ('Honda Vezel e:HEV', '2022', '/vehicles/vezel.jpg', 'Verified auction grade 5', true, true, 3),
  ('Toyota Noah S-Z', '2022', '/vehicles/noah.jpg', '7-seater family MPV delivery', true, true, 4)
) as s(title, model_year, image_url, caption, customer_consent, is_published, sort_order)
where not exists (select 1 from public.delivered_cars limit 1);

-- Seed default duty sheet rows
insert into public.duty_sheet_rows (id, brand, model, chassis, year, cc, duty_bdt, sort_order) values
  ('d-harrier-24', 'Toyota', 'Harrier', 'AXUH80', 2024, 2000, 3250000, 1),
  ('d-harrier-22', 'Toyota', 'Harrier', 'AXUH80', 2022, 2000, 2850000, 2),
  ('d-harrier-20', 'Toyota', 'Harrier', 'ZSU60', 2020, 2000, 2450000, 3),
  ('d-harrier-18', 'Toyota', 'Harrier', 'ZSU60', 2018, 2000, 1980000, 4),
  ('d-prado-23', 'Toyota', 'Land Cruiser Prado', 'GDJ150', 2023, 2800, 6200000, 5),
  ('d-prado-21', 'Toyota', 'Land Cruiser Prado', 'GDJ150', 2021, 2800, 5400000, 6),
  ('d-premio-21', 'Toyota', 'Premio', 'NZT260', 2021, 1500, 1450000, 7),
  ('d-premio-19', 'Toyota', 'Premio', 'NZT260', 2019, 1800, 1680000, 8),
  ('d-cross-23', 'Toyota', 'Corolla Cross', 'ZVG11', 2023, 1800, 2100000, 9),
  ('d-noah-22', 'Toyota', 'Noah', 'ZWR90', 2022, 1800, 2350000, 10),
  ('d-vezel-22', 'Honda', 'Vezel', 'RV5', 2022, 1500, 1650000, 11),
  ('d-vezel-19', 'Honda', 'Vezel', 'RU3', 2019, 1500, 1280000, 12),
  ('d-xtrail-23', 'Nissan', 'X-Trail', 'T33', 2023, 1500, 2200000, 13)
on conflict (id) do nothing;
