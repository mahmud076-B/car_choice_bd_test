"use server";

import { revalidatePath } from "next/cache";
import { saveDutySheet } from "@/lib/duty";
import type { DutyRow } from "@/data/dutySheet";

export async function saveDutySheetAction(
  rows: DutyRow[]
): Promise<{ ok: boolean; message: string }> {
  const result = await saveDutySheet(rows);
  if (!result.ok) return { ok: false, message: result.error };
  revalidatePath("/car-duty");
  revalidatePath("/admin/duty");
  return { ok: true, message: "Duty sheet saved. The public calculator uses these amounts." };
}
