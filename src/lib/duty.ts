import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_DUTY_SHEET, type DutyRow } from "@/data/dutySheet";
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
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(cleaned, null, 2), "utf8");
  return { ok: true };
}
