import type {
  InventoryStatus,
  PriceDisplayMode,
  PublicationStatus,
  Vehicle,
  VehicleImage,
} from "@/lib/types";

type DbImage = {
  id: string;
  url: string;
  alt?: string | null;
  sort_order?: number | null;
  is_cover?: boolean | null;
  is_auction_sheet?: boolean | null;
};

type DbVehicle = {
  id: string;
  slug: string;
  make: string;
  model: string;
  package?: string | null;
  year: number;
  grade?: string | null;
  mileage?: number | null;
  engine_cc?: number | null;
  fuel_type?: string | null;
  transmission?: string | null;
  drive?: string | null;
  body_type?: string | null;
  color?: string | null;
  chassis?: string | null;
  inventory_status?: string | null;
  status_label?: string | null;
  location?: string | null;
  price_bdt?: number | null;
  price_display?: string | null;
  price_display_mode?: string | null;
  is_negotiable?: boolean | null;
  is_featured?: boolean | null;
  publication_status?: string | null;
  auction_sheet_available?: boolean | null;
  features?: string[] | null;
  vehicle_images?: DbImage[] | null;
};

function statusLabel(status: string | null | undefined): string {
  switch (status) {
    case "READY_STOCK":
      return "Ready in Showroom";
    case "PORT_STOCK":
      return "At Port";
    case "IN_TRANSIT":
      return "In Transit";
    case "RESERVED":
      return "Reserved";
    case "SOLD":
      return "Sold";
    default:
      return status?.replace(/_/g, " ") ?? "Available";
  }
}

export function mapDbVehicle(row: DbVehicle): Vehicle {
  const images: VehicleImage[] = (row.vehicle_images ?? [])
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt ?? undefined,
      sortOrder: img.sort_order ?? 0,
      isCover: Boolean(img.is_cover),
      isAuctionSheet: Boolean(img.is_auction_sheet),
    }));

  const cover =
    images.find((i) => i.isCover)?.url ??
    images[0]?.url ??
    "/vehicles/harrier.jpg";

  const priceMode = (row.price_display_mode ??
    "CALL_FOR_PRICE") as PriceDisplayMode;

  return {
    id: row.id,
    slug: row.slug,
    make: row.make,
    model: row.model,
    package: row.package ?? "",
    year: row.year,
    grade: row.grade ?? "—",
    mileage: row.mileage ?? 0,
    engineCc: row.engine_cc ?? 0,
    fuelType: (row.fuel_type as Vehicle["fuelType"]) ?? "Petrol",
    transmission: row.transmission ?? "—",
    drive: (row.drive as Vehicle["drive"]) ?? "2WD",
    bodyType: (row.body_type as Vehicle["bodyType"]) ?? "Sedan",
    color: row.color ?? "—",
    chassisPrefix: row.chassis ?? "—",
    status: (row.inventory_status as InventoryStatus) ?? "READY_STOCK",
    statusLabel: row.status_label ?? statusLabel(row.inventory_status),
    location:
      (row.location as Vehicle["location"]) ?? "Rajshahi Showroom",
    priceBdt: row.price_bdt ?? null,
    priceDisplay:
      row.price_display ??
      (priceMode === "EXACT" && row.price_bdt
        ? `৳ ${row.price_bdt.toLocaleString("en-BD")}`
        : "Call for Price"),
    priceMode,
    isNegotiable: row.is_negotiable ?? true,
    featured: row.is_featured ?? false,
    publicationStatus:
      (row.publication_status as PublicationStatus) ?? "PUBLISHED",
    imageUrl: cover,
    images:
      images.length > 0
        ? images
        : [
            {
              id: `${row.id}-cover`,
              url: cover,
              sortOrder: 0,
              isCover: true,
            },
          ],
    auctionSheetAvailable: row.auction_sheet_available ?? false,
    features: row.features ?? [],
  };
}
