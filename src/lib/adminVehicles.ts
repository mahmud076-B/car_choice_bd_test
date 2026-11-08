import { promises as fs } from "fs";
import path from "path";
import { FEATURED_VEHICLES } from "@/data/mockVehicles";
import type {
  InventoryStatus,
  PublicationStatus,
  Vehicle,
} from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { mapDbVehicle } from "@/lib/supabase/mappers";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "vehicles.json");

async function readOverrides(): Promise<Vehicle[] | null> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as Vehicle[];
  } catch {
    return null;
  }
}

async function writeOverrides(vehicles: Vehicle[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(vehicles, null, 2), "utf8");
}

async function mergeLocal(): Promise<Vehicle[]> {
  const overrides = await readOverrides();
  if (overrides === null) return [...FEATURED_VEHICLES];
  return overrides;
}

export async function adminListVehicles(): Promise<Vehicle[]> {
  if (!isSupabaseConfigured()) {
    return mergeLocal();
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*, vehicle_images(*)")
      .order("updated_at", { ascending: false });
    if (error || !data) return [];
    return data.map(mapDbVehicle);
  } catch {
    return [];
  }
}

export async function adminGetVehicle(id: string): Promise<Vehicle | null> {
  const all = await adminListVehicles();
  return all.find((v) => v.id === id) ?? null;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function adminSaveVehicle(
  vehicle: Vehicle
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const isUuid = UUID_RE.test(vehicle.id);

      const payload: Record<string, unknown> = {
        slug: vehicle.slug,
        make: vehicle.make,
        model: vehicle.model,
        package: vehicle.package,
        year: vehicle.year,
        grade: vehicle.grade,
        mileage: vehicle.mileage,
        engine_cc: vehicle.engineCc,
        fuel_type: vehicle.fuelType,
        transmission: vehicle.transmission,
        drive: vehicle.drive,
        body_type: vehicle.bodyType,
        color: vehicle.color,
        chassis: vehicle.chassisPrefix,
        inventory_status: vehicle.status,
        status_label: vehicle.statusLabel,
        location: vehicle.location,
        price_bdt: vehicle.priceBdt,
        price_display: vehicle.priceDisplay,
        price_display_mode: vehicle.priceMode,
        is_negotiable: vehicle.isNegotiable,
        is_featured: vehicle.featured,
        publication_status: vehicle.publicationStatus,
        auction_sheet_available: vehicle.auctionSheetAvailable,
        features: vehicle.features,
        updated_at: new Date().toISOString(),
      };

      if (isUuid) {
        payload.id = vehicle.id;
      }

      const { data: savedRow, error } = await supabase
        .from("vehicles")
        .upsert(payload, { onConflict: isUuid ? "id" : "slug" })
        .select("id")
        .single();

      if (error || !savedRow) {
        return { ok: false, error: error?.message ?? "Save failed" };
      }

      const vehicleId = savedRow.id as string;

      // Sync vehicle_images table (cover, gallery, auction sheet)
      if (vehicle.images && vehicle.images.length > 0) {
        await supabase
          .from("vehicle_images")
          .delete()
          .eq("vehicle_id", vehicleId);

        const imageRows = vehicle.images.map((img, idx) => ({
          vehicle_id: vehicleId,
          url: img.url,
          alt: img.alt ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
          sort_order: idx,
          is_cover: Boolean(img.isCover),
          is_auction_sheet: Boolean(img.isAuctionSheet),
        }));

        await supabase.from("vehicle_images").insert(imageRows);
      }

      return { ok: true, id: vehicleId };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Save failed",
      };
    }
  }

  const all = await mergeLocal();
  const idx = all.findIndex((v) => v.id === vehicle.id);
  if (idx >= 0) all[idx] = vehicle;
  else all.unshift(vehicle);
  await writeOverrides(all);
  return { ok: true, id: vehicle.id };
}

export async function adminQuickUpdateVehicle(
  id: string,
  patch: {
    publicationStatus?: PublicationStatus;
    status?: InventoryStatus;
    statusLabel?: string;
    featured?: boolean;
  }
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (isSupabaseConfigured()) {
    if (!UUID_RE.test(id)) {
      return { ok: false, error: "Invalid vehicle ID" };
    }
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const dbPatch: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };
      if (patch.publicationStatus !== undefined) {
        dbPatch.publication_status = patch.publicationStatus;
      }
      if (patch.status !== undefined) {
        dbPatch.inventory_status = patch.status;
      }
      if (patch.statusLabel !== undefined) {
        dbPatch.status_label = patch.statusLabel;
      }
      if (patch.featured !== undefined) {
        dbPatch.is_featured = patch.featured;
      }
      const { error } = await supabase
        .from("vehicles")
        .update(dbPatch)
        .eq("id", id);
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Update failed",
      };
    }
  }

  const all = await mergeLocal();
  const idx = all.findIndex((v) => v.id === id);
  if (idx < 0) return { ok: false, error: "Vehicle not found" };
  all[idx] = {
    ...all[idx],
    ...(patch.publicationStatus !== undefined
      ? { publicationStatus: patch.publicationStatus }
      : {}),
    ...(patch.status !== undefined ? { status: patch.status } : {}),
    ...(patch.statusLabel !== undefined
      ? { statusLabel: patch.statusLabel }
      : {}),
    ...(patch.featured !== undefined ? { featured: patch.featured } : {}),
  };
  await writeOverrides(all);
  return { ok: true };
}

export async function adminDeleteVehicle(
  id: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (isSupabaseConfigured()) {
    if (!UUID_RE.test(id)) {
      return { ok: false, error: "Invalid vehicle ID" };
    }
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { error } = await supabase.from("vehicles").delete().eq("id", id);
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Delete failed",
      };
    }
  }

  const all = await mergeLocal();
  const next = all.filter((v) => v.id !== id);
  await writeOverrides(next);
  return { ok: true };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
