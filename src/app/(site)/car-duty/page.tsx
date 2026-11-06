import type { Metadata } from "next";
import DutyCalculator from "@/components/duty/DutyCalculator";
import { listDutySheet } from "@/lib/duty";

export const metadata: Metadata = {
  title: "Car Duty Calculator | Car Choice BD",
  description:
    "Check the current Bangladesh import duty for Japanese reconditioned cars from the Car Choice BD duty sheet.",
};

export default async function CarDutyPage() {
  const rows = await listDutySheet();

  return (
    <div className="bg-[#050505] text-white">
      <section className="max-w-3xl mx-auto px-4 py-14 sm:py-20">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#d4af37] font-semibold">
          Bangladesh import
        </p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight">
          Car Duty Calculator
        </h1>
        <p className="mt-5 max-w-[42ch] text-[15px] sm:text-lg leading-[1.75] text-white/75">
          Pick the brand, model, chassis code, year, and engine size. The
          amount is the current Car Choice duty sheet, kept by our staff.
        </p>
        <div className="mt-8">
          <DutyCalculator rows={rows} />
        </div>
        <p className="mt-5 text-xs leading-relaxed text-white/40">
          This list is separate from live stock. A model can appear here even
          when that exact car is not in the showroom. The figure is our current
          sheet, not a Bangladesh Customs assessment. Confirm the final duty
          with the showroom before you buy.
        </p>
      </section>
    </div>
  );
}
