"use server";

import { revalidatePath } from "next/cache";
import { adminSaveVehicle, slugify } from "@/lib/adminVehicles";
import type { Vehicle } from "@/lib/types";

export async function saveVehicleAction(
  _prev: { ok: boolean; message: string } | null,
  formData: FormData
): Promise<{ ok: boolean; message: string; id?: string }> {
  const id = String(formData.get("id") || `local_${Date.now()}`);
  const make = String(formData.get("make") || "").trim();
  const model = String(formData.get("model") || "").trim();
  const year = Number(formData.get("year") || 2024);
  const packageName = String(formData.get("package") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const slug =
    slugInput ||
    slugify(`${make}-${model}-${packageName}-${year}`);

  const imageUrl =
    String(formData.get("imageUrl") || "").trim() || "/vehicles/harrier.jpg";
  const featuresRaw = String(formData.get("features") || "");
  const features = featuresRaw
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean);

  const priceMode = String(formData.get("priceMode") || "CALL_FOR_PRICE") as
    | "EXACT"
    | "CALL_FOR_PRICE"
    | "UPON_REQUEST";
  const priceBdtRaw = String(formData.get("priceBdt") || "");
  const priceBdt = priceBdtRaw ? Number(priceBdtRaw) : null;

  const vehicle: Vehicle = {
    id,
    slug,
    make,
    model,
    package: packageName,
    year,
    grade: String(formData.get("grade") || ""),
    mileage: Number(formData.get("mileage") || 0),
    engineCc: Number(formData.get("engineCc") || 0),
    fuelType: (String(formData.get("fuelType") || "Petrol") as Vehicle["fuelType"]),
    transmission: String(formData.get("transmission") || ""),
    drive: (String(formData.get("drive") || "2WD") as Vehicle["drive"]),
    bodyType: (String(
      formData.get("bodyType") || "Sedan"
    ) as Vehicle["bodyType"]),
    color: String(formData.get("color") || ""),
    chassisPrefix: String(formData.get("chassisPrefix") || ""),
    status: (String(
      formData.get("status") || "READY_STOCK"
    ) as Vehicle["status"]),
    statusLabel: String(formData.get("statusLabel") || "Ready in Showroom"),
    location: (String(
      formData.get("location") || "Rajshahi Showroom"
    ) as Vehicle["location"]),
    priceBdt,
    priceDisplay:
      String(formData.get("priceDisplay") || "") ||
      (priceMode === "EXACT" && priceBdt
        ? `৳ ${priceBdt.toLocaleString("en-BD")}`
        : "Call for Price"),
    priceMode,
    isNegotiable: formData.get("isNegotiable") === "on",
    featured: formData.get("featured") === "on",
    publicationStatus: (String(
      formData.get("publicationStatus") || "DRAFT"
    ) as Vehicle["publicationStatus"]),
    imageUrl,
    images: [
      {
        id: `${id}-cover`,
        url: imageUrl,
        sortOrder: 0,
        isCover: true,
      },
      {
        id: `${id}-2`,
        url: imageUrl,
        sortOrder: 1,
        isCover: false,
      },
      {
        id: `${id}-sheet`,
        url: imageUrl,
        sortOrder: 2,
        isCover: false,
        isAuctionSheet: true,
      },
    ],
    auctionSheetAvailable: formData.get("auctionSheetAvailable") === "on",
    features,
  };

  if (!make || !model) {
    return { ok: false, message: "Make and model are required." };
  }

  const result = await adminSaveVehicle(vehicle);
  if (!result.ok) return { ok: false, message: result.error };

  revalidatePath("/stock");
  revalidatePath(`/stock/${slug}`);
  revalidatePath("/admin/vehicles");
  revalidatePath("/");

  return { ok: true, message: "Vehicle saved.", id: vehicle.id };
}
