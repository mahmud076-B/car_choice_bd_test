import { promises as fs } from "fs";
import path from "path";
import { FEATURED_VEHICLES } from "@/data/mockVehicles";
import type { Vehicle } from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { mapDbVehicle } from "@/lib/supabase/mappers";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "vehicles.json");

async function readOverrides(): Promise<Vehicle[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as Vehicle[];
  } catch {
    return [];
  }
}

async function writeOverrides(vehicles: Vehicle[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(vehicles, null, 2), "utf8");
}

function mergeLocal(): Promise<Vehicle[]> {
  return readOverrides().then((overrides) => {
    if (overrides.length === 0) return [...FEATURED_VEHICLES];
    const byId = new Map(FEATURED_VEHICLES.map((v) => [v.id, v]));
    for (const v of overrides) byId.set(v.id, v);
    return Array.from(byId.values());
  });
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
    if (error || !data) return mergeLocal();
    return data.map(mapDbVehicle);
  } catch {
    return mergeLocal();
  }
}

export async function adminGetVehicle(id: string): Promise<Vehicle | null> {
  const all = await adminListVehicles();
  return all.find((v) => v.id === id) ?? null;
}

export async function adminSaveVehicle(
  vehicle: Vehicle
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { error } = await supabase.from("vehicles").upsert({
        id: vehicle.id.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        )
          ? vehicle.id
          : undefined,
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
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true };
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
  return { ok: true };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
