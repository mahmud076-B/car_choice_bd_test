import { promises as fs } from "fs";
import path from "path";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const DATA_DIR = path.join(process.cwd(), ".data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const PREORDERS_FILE = path.join(DATA_DIR, "preorders.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function writeJson<T>(file: string, data: T[]) {
  await ensureDataDir();
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export type LocalInquiry = {
  id: string;
  inquiry_type: string;
  status: string;
  name: string;
  phone?: string;
  email?: string;
  subject?: string;
  message: string;
  chassis?: string;
  vehicle_slug?: string;
  created_at: string;
};

export type LocalPreOrder = {
  id: string;
  status: string;
  name: string;
  phone: string;
  email?: string;
  preferred_make?: string;
  preferred_model?: string;
  year_min?: number | null;
  year_max?: number | null;
  budget_bdt?: number | null;
  notes?: string;
  created_at: string;
};

export async function createInquiry(
  payload: Omit<LocalInquiry, "id" | "created_at" | "status"> & {
    status?: string;
  }
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  if (payload.name && false) {
    // honeypot already checked upstream
  }

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("inquiries")
        .insert({
          inquiry_type: payload.inquiry_type,
          name: payload.name,
          phone: payload.phone || null,
          email: payload.email || null,
          subject: payload.subject || null,
          message: payload.message,
          chassis: payload.chassis || null,
          vehicle_slug: payload.vehicle_slug || null,
          status: "NEW",
        })
        .select("id")
        .single();

      if (error) return { ok: false, error: error.message };
      return { ok: true, id: data.id };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Failed to save inquiry",
      };
    }
  }

  const rows = await readJson<LocalInquiry>(INQUIRIES_FILE);
  const id = `inq_${Date.now()}`;
  rows.unshift({
    ...payload,
    id,
    status: "NEW",
    created_at: new Date().toISOString(),
  });
  await writeJson(INQUIRIES_FILE, rows);
  return { ok: true, id };
}

export async function createPreOrder(
  payload: Omit<LocalPreOrder, "id" | "created_at" | "status">
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("pre_order_requests")
        .insert({
          name: payload.name,
          phone: payload.phone,
          email: payload.email || null,
          preferred_make: payload.preferred_make || null,
          preferred_model: payload.preferred_model || null,
          year_min: payload.year_min ?? null,
          year_max: payload.year_max ?? null,
          budget_bdt: payload.budget_bdt ?? null,
          notes: payload.notes || null,
          status: "NEW",
        })
        .select("id")
        .single();

      if (error) return { ok: false, error: error.message };
      return { ok: true, id: data.id };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Failed to save pre-order",
      };
    }
  }

  const rows = await readJson<LocalPreOrder>(PREORDERS_FILE);
  const id = `po_${Date.now()}`;
  rows.unshift({
    ...payload,
    id,
    status: "NEW",
    created_at: new Date().toISOString(),
  });
  await writeJson(PREORDERS_FILE, rows);
  return { ok: true, id };
}

export async function listInquiriesLocal(): Promise<LocalInquiry[]> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      return (data as LocalInquiry[]) ?? [];
    } catch {
      return readJson(INQUIRIES_FILE);
    }
  }
  return readJson(INQUIRIES_FILE);
}

export async function listPreOrdersLocal(): Promise<LocalPreOrder[]> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data } = await supabase
        .from("pre_order_requests")
        .select("*")
        .order("created_at", { ascending: false });
      return (data as LocalPreOrder[]) ?? [];
    } catch {
      return readJson(PREORDERS_FILE);
    }
  }
  return readJson(PREORDERS_FILE);
}
