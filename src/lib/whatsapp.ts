import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { Vehicle } from "@/lib/types";

export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function vehicleInquiryMessage(vehicle: Vehicle): string {
  const priceLine =
    vehicle.priceMode === "EXACT" && vehicle.priceDisplay
      ? `Price: ${vehicle.priceDisplay}`
      : "Price: Please confirm availability";

  return [
    `${vehicle.make} ${vehicle.model}`,
    `Year: ${vehicle.year}`,
    `Color: ${vehicle.color}`,
    `Auction Grade: ${vehicle.grade}`,
    `Mileage: ${vehicle.mileage.toLocaleString()} km`,
    `Package: ${vehicle.package}`,
    `Location: ${vehicle.location}`,
    `Chassis: ${vehicle.chassisPrefix}`,
    priceLine,
    "",
    "ভাইয়া, এই গাড়িটা কি available আছে? থাকলে গাড়ির price এবং location জানাবেন।",
  ].join("\n");
}

export function vehicleWhatsAppUrl(vehicle: Vehicle): string {
  return buildWhatsAppUrl(vehicleInquiryMessage(vehicle));
}

export function generalInquiryUrl(message?: string): string {
  return buildWhatsAppUrl(
    message ??
      "Hello Car Choice BD, I am inquiring about a Japanese reconditioned vehicle."
  );
}

export function stockListInquiryUrl(): string {
  return buildWhatsAppUrl(
    "Hello Car Choice BD, I am inquiring about your full stock list."
  );
}

export function verifyInquiryUrl(chassis: string): string {
  return buildWhatsAppUrl(
    `Hello Car Choice BD, please verify auction sheet for chassis: ${chassis}`
  );
}
