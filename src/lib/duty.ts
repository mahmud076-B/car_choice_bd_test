import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_DUTY_SHEET, type DutyRow } from "@/data/dutySheet";
import { isSupabaseConfigured } from "@/lib/supabase/config";
export type { DutyRow };

const FILE = path.join(process.cwd(), ".data", "duty-sheet.json");

function cleanRow(raw: Partial<DutyRow>, index: number): DutyRow | null {
  const brand = String(raw.brand || "").trim();
  const model = String(raw.model || "").trim();
  const chassis = String(raw.chassis || "").trim().toUpperCase();
  const year = Number(raw.year);
  const cc = Number(raw.cc);
  const dutyBdt = Number(raw.dutyBdt);
  if (!brand || !model || !chassis) return null;
  if (!Number.isFinite(year) || year < 1990 || year > 2035) return null;
  if (!Number.isFinite(cc) || cc < 600 || cc > 8000) return null;
  if (!Number.isFinite(dutyBdt) || dutyBdt < 0) return null;
  return {
    id: String(raw.id || `d-${index}-${Date.now()}`),
    brand,
    model,
    chassis,
    year,
    cc,
    dutyBdt: Math.round(dutyBdt),
  };
}

export async function listDutySheet(): Promise<DutyRow[]> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("duty_sheet_rows")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((r) => ({
          id: String(r.id),
          brand: String(r.brand),
          model: String(r.model),
          chassis: String(r.chassis),
          year: Number(r.year),
          cc: Number(r.cc),
          dutyBdt: Number(r.duty_bdt),
        }));
      }
    } catch {
      /* fallback to local file or bundled default */
    }
  }

  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<DutyRow>[];
    const rows = parsed
      .map((row, index) => cleanRow(row, index))
      .filter((row): row is DutyRow => row !== null);
    if (rows.length > 0) return rows;
  } catch {
    /* first run uses the bundled sheet */
  }
  return DEFAULT_DUTY_SHEET;
}

export async function saveDutySheet(
  rows: Partial<DutyRow>[]
): Promise<{ ok: true } | { ok: false; error: string }> {
  const cleaned = rows
    .map((row, index) => cleanRow(row, index))
    .filter((row): row is DutyRow => row !== null);
  if (cleaned.length === 0) {
    return { ok: false, error: "Add at least one complete duty row." };
  }

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { error: delError } = await supabase
        .from("duty_sheet_rows")
        .delete()
        .neq("id", "");
      if (delError) {
        return { ok: false, error: delError.message };
      }
      const { error } = await supabase.from("duty_sheet_rows").insert(
        cleaned.map((r, idx) => ({
          id: r.id,
          brand: r.brand,
          model: r.model,
          chassis: r.chassis,
          year: r.year,
          cc: r.cc,
          duty_bdt: r.dutyBdt,
          sort_order: idx,
          updated_at: new Date().toISOString(),
        }))
      );
      if (error) {
        return { ok: false, error: error.message };
      }
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Failed to save duty sheet",
      };
    }
  }

  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(cleaned, null, 2), "utf8");
  return { ok: true };
}
