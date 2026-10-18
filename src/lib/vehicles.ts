import { FEATURED_VEHICLES } from "@/data/mockVehicles";
import type { Vehicle } from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { mapDbVehicle } from "@/lib/supabase/mappers";

export async function listPublishedVehicles(): Promise<Vehicle[]> {
  if (!isSupabaseConfigured()) {
    const { adminListVehicles } = await import("@/lib/adminVehicles");
    const all = await adminListVehicles();
    return all.filter((v) => v.publicationStatus === "PUBLISHED");
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*, vehicle_images(*)")
      .eq("publication_status", "PUBLISHED")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("listPublishedVehicles:", error?.message);
      return FEATURED_VEHICLES.filter(
        (v) => v.publicationStatus === "PUBLISHED"
      );
    }

    return data.map(mapDbVehicle);
  } catch (err) {
    console.error("listPublishedVehicles fallback:", err);
    return FEATURED_VEHICLES.filter((v) => v.publicationStatus === "PUBLISHED");
  }
}

export async function listFeaturedVehicles(): Promise<Vehicle[]> {
  const all = await listPublishedVehicles();
  return all.filter((v) => v.featured);
}

export async function getVehicleBySlug(
  slug: string
): Promise<Vehicle | null> {
  if (!isSupabaseConfigured()) {
    const { adminListVehicles } = await import("@/lib/adminVehicles");
    const all = await adminListVehicles();
    return all.find((v) => v.slug === slug) ?? null;
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*, vehicle_images(*)")
      .eq("slug", slug)
      .eq("publication_status", "PUBLISHED")
      .maybeSingle();

    if (error || !data) {
      return FEATURED_VEHICLES.find((v) => v.slug === slug) ?? null;
    }

    return mapDbVehicle(data);
  } catch {
    return FEATURED_VEHICLES.find((v) => v.slug === slug) ?? null;
  }
}

export async function listAllVehiclesAdmin(): Promise<Vehicle[]> {
  const { adminListVehicles } = await import("@/lib/adminVehicles");
  return adminListVehicles();
}
