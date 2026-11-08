import Link from "next/link";
import { listDeliveredCars } from "@/lib/delivered";
import DeliveredAdminForm from "@/components/admin/DeliveredAdminForm";

export default async function AdminDeliveredPage() {
  const items = await listDeliveredCars();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#d4af37] font-semibold">
            Social Proof Gallery
          </p>
          <h1 className="text-3xl font-bold text-white font-['Outfit'] mt-1">
            Delivered Cars Showcase
          </h1>
          <p className="text-sm text-[#b0b0b0] mt-1">
            Photos added here appear on both the Homepage and the{" "}
            <code className="text-[#d4af37]">/delivered-cars</code> gallery.
          </p>
        </div>
        <Link
          href="/delivered-cars"
          className="btn-ghost px-4 py-2 rounded-full text-xs"
        >
          View Public Gallery ↗
        </Link>
      </div>

      <DeliveredAdminForm initialItems={items} />
    </div>
  );
}
