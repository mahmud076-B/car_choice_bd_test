"use server";

import { revalidatePath } from "next/cache";
import {
  adminDeleteVehicle,
  adminQuickUpdateVehicle,
  adminSaveVehicle,
  slugify,
} from "@/lib/adminVehicles";
import { requireStaff } from "@/lib/supabase/auth";
import type {
  InventoryStatus,
  PublicationStatus,
  Vehicle,
  VehicleImage,
} from "@/lib/types";

export async function saveVehicleAction(
  _prev: { ok: boolean; message: string; id?: string; slug?: string } | null,
  formData: FormData
): Promise<{ ok: boolean; message: string; id?: string; slug?: string }> {
  const staff = await requireStaff();
  if (!staff.ok) return { ok: false, message: staff.error };

  const id = String(formData.get("id") || `local_${Date.now()}`);
  const make = String(formData.get("make") || "").trim();
  const model = String(formData.get("model") || "").trim();
  const year = Number(formData.get("year") || 2024);
  const packageName = String(formData.get("package") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const slug =
    slugInput || slugify(`${make}-${model}-${packageName}-${year}`);

  const imageUrl =
    String(formData.get("imageUrl") || "").trim() || "/vehicles/harrier.jpg";
  const galleryUrlsRaw = String(formData.get("galleryUrls") || "");
  const auctionSheetUrl = String(formData.get("auctionSheetUrl") || "").trim();

  const galleryUrls = galleryUrlsRaw
    .split(/[\n,]+/)
    .map((u) => u.trim())
    .filter(Boolean);

  const images: VehicleImage[] = [
    {
      id: `${id}-cover`,
      url: imageUrl,
      alt: `${year} ${make} ${model} Cover`,
      sortOrder: 0,
      isCover: true,
      isAuctionSheet: false,
    },
  ];

  galleryUrls.forEach((url, idx) => {
    images.push({
      id: `${id}-gal-${idx + 1}`,
      url,
      alt: `${year} ${make} ${model} Photo ${idx + 2}`,
      sortOrder: idx + 1,
      isCover: false,
      isAuctionSheet: false,
    });
  });

  if (auctionSheetUrl) {
    images.push({
      id: `${id}-sheet`,
      url: auctionSheetUrl,
      alt: `${year} ${make} ${model} Japanese Auction Sheet`,
      sortOrder: images.length,
      isCover: false,
      isAuctionSheet: true,
    });
  }

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
    fuelType: String(
      formData.get("fuelType") || "Petrol"
    ) as Vehicle["fuelType"],
    transmission: String(formData.get("transmission") || ""),
    drive: String(formData.get("drive") || "2WD") as Vehicle["drive"],
    bodyType: String(
      formData.get("bodyType") || "Sedan"
    ) as Vehicle["bodyType"],
    color: String(formData.get("color") || ""),
    chassisPrefix: String(formData.get("chassisPrefix") || ""),
    status: String(
      formData.get("status") || "READY_STOCK"
    ) as Vehicle["status"],
    statusLabel: String(formData.get("statusLabel") || "Ready in Showroom"),
    location: String(
      formData.get("location") || "Rajshahi Showroom"
    ) as Vehicle["location"],
    priceBdt,
    priceDisplay:
      String(formData.get("priceDisplay") || "").trim() ||
      (priceMode === "EXACT" && priceBdt
        ? `৳ ${priceBdt.toLocaleString("en-IN")}`
        : priceMode === "UPON_REQUEST"
          ? "Price on Request"
          : "Call for Price"),
    priceMode,
    isNegotiable: formData.get("isNegotiable") === "on",
    featured: formData.get("featured") === "on",
    publicationStatus: String(
      formData.get("publicationStatus") || "DRAFT"
    ) as Vehicle["publicationStatus"],
    imageUrl,
    images,
    auctionSheetAvailable:
      formData.get("auctionSheetAvailable") === "on" || Boolean(auctionSheetUrl),
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
  revalidatePath("/admin");
  revalidatePath("/");

  return {
    ok: true,
    message: "Vehicle saved and live stock updated.",
    id: result.id,
    slug: vehicle.slug,
  };
}

export async function quickUpdateVehicleAction(
  id: string,
  patch: {
    publicationStatus?: PublicationStatus;
    status?: InventoryStatus;
    statusLabel?: string;
    featured?: boolean;
  }
): Promise<{ ok: boolean; message: string }> {
  const staff = await requireStaff();
  if (!staff.ok) return { ok: false, message: staff.error };

  const res = await adminQuickUpdateVehicle(id, patch);
  if (!res.ok) return { ok: false, message: res.error };

  revalidatePath("/stock");
  revalidatePath("/admin/vehicles");
  revalidatePath("/admin");
  revalidatePath("/");
  return { ok: true, message: "Vehicle updated." };
}

export async function deleteVehicleAction(
  id: string
): Promise<{ ok: boolean; message: string }> {
  const staff = await requireStaff();
  if (!staff.ok) return { ok: false, message: staff.error };

  const res = await adminDeleteVehicle(id);
  if (!res.ok) return { ok: false, message: res.error };

  revalidatePath("/stock");
  revalidatePath("/admin/vehicles");
  revalidatePath("/admin");
  revalidatePath("/");
  return { ok: true, message: "Vehicle deleted." };
}
