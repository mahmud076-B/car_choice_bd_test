"use server";

import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { MOCK_DELIVERED_CARS } from "@/data/mockVehicles";
import type { DeliveredCar } from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const FILE = path.join(process.cwd(), ".data", "delivered.json");

async function readLocal(): Promise<DeliveredCar[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as DeliveredCar[];
  } catch {
    return [...MOCK_DELIVERED_CARS];
  }
}

export async function addDeliveredAction(
  _prev: { ok: boolean; message: string } | null,
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  const title = String(formData.get("title") || "").trim();
  const modelYear = String(formData.get("modelYear") || "").trim();
  const imageUrl =
    String(formData.get("imageUrl") || "").trim() || "/vehicles/harrier.jpg";
  const caption = String(formData.get("caption") || "").trim();
  const consent = formData.get("customerConsent") === "on";

  if (!title || !consent) {
    return {
      ok: false,
      message: "Title and customer consent are required.",
    };
  }

  const item: DeliveredCar = {
    id: `del_${Date.now()}`,
    title,
    modelYear,
    imageUrl,
    caption,
    customerConsent: true,
  };

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { error } = await supabase.from("delivered_cars").insert({
        title,
        model_year: modelYear,
        image_url: imageUrl,
        caption,
        customer_consent: true,
        is_published: true,
      });
      if (error) return { ok: false, message: error.message };
    } catch (e) {
      return {
        ok: false,
        message: e instanceof Error ? e.message : "Save failed",
      };
    }
  } else {
    const rows = await readLocal();
    rows.unshift(item);
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(rows, null, 2), "utf8");
  }

  revalidatePath("/delivered-cars");
  revalidatePath("/");
  revalidatePath("/admin/delivered-cars");
  return { ok: true, message: "Delivered car added." };
}
