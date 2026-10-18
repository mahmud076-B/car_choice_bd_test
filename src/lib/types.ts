export type FuelType = "Hybrid" | "Petrol" | "Diesel" | "EV";
export type DriveType = "2WD" | "4WD" | "AWD";
export type BodyType = "SUV / Crossover" | "Sedan" | "Van / MPV" | "Hatchback";
export type InventoryStatus =
  | "READY_STOCK"
  | "PORT_STOCK"
  | "IN_TRANSIT"
  | "RESERVED"
  | "SOLD";
export type PublicationStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type PriceDisplayMode = "EXACT" | "CALL_FOR_PRICE" | "UPON_REQUEST";
export type InquiryType =
  | "VEHICLE_INQUIRY"
  | "AUCTION_VERIFY"
  | "GENERAL_CONTACT";
export type InquiryStatus = "NEW" | "IN_PROGRESS" | "CLOSED";

export interface VehicleImage {
  id: string;
  url: string;
  alt?: string;
  sortOrder: number;
  isCover: boolean;
  isAuctionSheet?: boolean;
}

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  package: string;
  year: number;
  grade: string;
  mileage: number;
  engineCc: number;
  fuelType: FuelType;
  transmission: string;
  drive: DriveType;
  bodyType: BodyType;
  color: string;
  chassisPrefix: string;
  status: InventoryStatus;
  statusLabel: string;
  location:
    | "Rajshahi Showroom"
    | "Mongla Port"
    | "Chattogram Port"
    | "Japan Auction";
  priceBdt: number | null;
  priceDisplay: string;
  priceMode: PriceDisplayMode;
  isNegotiable: boolean;
  featured: boolean;
  publicationStatus: PublicationStatus;
  imageUrl: string;
  images: VehicleImage[];
  auctionSheetAvailable: boolean;
  features: string[];
}

export interface StockFilters {
  keyword?: string;
  make?: string;
  model?: string;
  year?: string;
  color?: string;
  grade?: string;
  fuel?: string;
  status?: string;
  body?: string;
  mileageMin?: string;
  mileageMax?: string;
  view?: "card" | "table";
  page?: string;
}

export interface DeliveredCar {
  id: string;
  title: string;
  modelYear: string;
  imageUrl: string;
  caption?: string;
  customerConsent: boolean;
}
