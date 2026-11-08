import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { Vehicle } from "@/lib/types";

export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Normalizes a customer phone number (especially Bangladeshi 01XXXXXXXXX numbers)
 * into international digits for wa.me links so staff can message the customer directly.
 */
export function normalizeCustomerPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("880") && digits.length >= 13) {
    return digits;
  }
  if (digits.startsWith("01") && digits.length === 11) {
    return `88${digits}`;
  }
  if (digits.startsWith("1") && digits.length === 10) {
    return `880${digits}`;
  }
  return digits || WHATSAPP_NUMBER;
}

export function customerWhatsAppUrl(phone: string, text: string): string {
  const normalized = normalizeCustomerPhone(phone);
  return `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
}

export function formatBdt(amount: number): string {
  return `৳ ${Math.round(amount).toLocaleString("en-IN")}`;
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
    `Mileage: ${vehicle.mileage.toLocaleString("en-IN")} km`,
    `Package: ${vehicle.package}`,
    `Location: ${vehicle.location}`,
    `Chassis: ${vehicle.chassisPrefix}`,
    priceLine,
    "",
    "Hello Car Choice BD, is this vehicle currently available? Please share the price and showroom inspection details.",
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
