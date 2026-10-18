import { promises as fs } from "fs";
import path from "path";
import { MOCK_DELIVERED_CARS } from "@/data/mockVehicles";
import type { DeliveredCar } from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const LOCAL_FILE = path.join(process.cwd(), ".data", "delivered.json");

async function readLocalDelivered(): Promise<DeliveredCar[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    return JSON.parse(raw) as DeliveredCar[];
  } catch {
    return MOCK_DELIVERED_CARS;
  }
}

export async function listDeliveredCars(): Promise<DeliveredCar[]> {
  if (!isSupabaseConfigured()) {
    const rows = await readLocalDelivered();
    return rows.filter((c) => c.customerConsent);
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("delivered_cars")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      return MOCK_DELIVERED_CARS.filter((c) => c.customerConsent);
    }

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      modelYear: row.model_year ?? "",
      imageUrl: row.image_url,
      caption: row.caption ?? undefined,
      customerConsent: Boolean(row.customer_consent),
    }));
  } catch {
    return MOCK_DELIVERED_CARS.filter((c) => c.customerConsent);
  }
}
