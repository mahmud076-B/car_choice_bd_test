import Link from "next/link";
import DutySheetEditor from "@/components/admin/DutySheetEditor";
import { listDutySheet } from "@/lib/duty";

export default async function AdminDutyPage() {
  const rows = await listDutySheet();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#d4af37] font-semibold">
            Showroom Duty Reference
          </p>
          <h1 className="text-3xl font-bold text-white font-['Outfit'] mt-1">
            Car Duty Sheet Editor
          </h1>
          <p className="text-sm text-[#b0b0b0] mt-1 max-w-2xl">
            The public{" "}
            <code className="text-[#d4af37]">/car-duty</code> calculator looks
            up these rows. Update the BDT amounts when the monthly showroom
            sheet changes.
          </p>
        </div>
        <Link
          href="/car-duty"
          className="btn-ghost px-4 py-2 rounded-full text-xs"
        >
          View Public Calculator ↗
        </Link>
      </div>

      <DutySheetEditor initial={rows} />
    </div>
  );
}
