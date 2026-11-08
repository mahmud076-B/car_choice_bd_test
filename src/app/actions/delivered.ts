"use server";

import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { MOCK_DELIVERED_CARS } from "@/data/mockVehicles";
import type { DeliveredCar } from "@/lib/types";
import { requireStaff } from "@/lib/supabase/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const FILE = path.join(process.cwd(), ".data", "delivered.json");

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function readLocal(): Promise<DeliveredCar[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as DeliveredCar[];
  } catch {
    return [...MOCK_DELIVERED_CARS];
  }
}

async function writeLocal(rows: DeliveredCar[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(rows, null, 2), "utf8");
}

export async function addDeliveredAction(
  _prev: { ok: boolean; message: string } | null,
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  const staff = await requireStaff();
  if (!staff.ok) return { ok: false, message: staff.error };

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
      if (error) {
        return { ok: false, message: error.message };
      }
    } catch (e) {
      return {
        ok: false,
        message: e instanceof Error ? e.message : "Failed to save delivered car",
      };
    }
  } else {
    const item: DeliveredCar = {
      id: `del_${Date.now()}`,
      title,
      modelYear,
      imageUrl,
      caption,
      customerConsent: true,
    };
    const rows = await readLocal();
    rows.unshift(item);
    await writeLocal(rows);
  }

  revalidatePath("/delivered-cars");
  revalidatePath("/");
  revalidatePath("/admin/delivered-cars");
  revalidatePath("/admin");
  return { ok: true, message: "Delivered car added to showcase." };
}

export async function deleteDeliveredAction(
  id: string
): Promise<{ ok: boolean; message: string }> {
  const staff = await requireStaff();
  if (!staff.ok) return { ok: false, message: staff.error };

  if (isSupabaseConfigured()) {
    if (!UUID_RE.test(id)) {
      return { ok: false, message: "Invalid delivered car ID." };
    }
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { error } = await supabase
        .from("delivered_cars")
        .delete()
        .eq("id", id);
      if (error) return { ok: false, message: error.message };
      revalidatePath("/delivered-cars");
      revalidatePath("/");
      revalidatePath("/admin/delivered-cars");
      revalidatePath("/admin");
      return { ok: true, message: "Delivered car removed." };
    } catch (e) {
      return {
        ok: false,
        message: e instanceof Error ? e.message : "Delete failed",
      };
    }
  }

  const rows = await readLocal();
  await writeLocal(rows.filter((r) => r.id !== id));
  revalidatePath("/delivered-cars");
  revalidatePath("/");
  revalidatePath("/admin/delivered-cars");
  revalidatePath("/admin");
  return { ok: true, message: "Delivered car removed." };
}
