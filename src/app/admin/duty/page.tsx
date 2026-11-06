import DutySheetEditor from "@/components/admin/DutySheetEditor";
import { listDutySheet } from "@/lib/duty";

export default async function AdminDutyPage() {
  const rows = await listDutySheet();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white font-['Outfit']">
        Duty sheet
      </h1>
      <p className="text-sm text-slate-400 mt-1 max-w-2xl">
        The public calculator looks up these rows. Change the taka amount here
        when the monthly sheet changes. This list is not the live stock.
      </p>
      <div className="mt-8">
        <DutySheetEditor initial={rows} />
      </div>
    </div>
  );
}
