import { listPreOrdersLocal } from "@/lib/leads";
import PreOrdersManager from "@/components/admin/PreOrdersManager";

export default async function AdminPreOrdersPage() {
  const rows = await listPreOrdersLocal();

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-white/10">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#d4af37] font-semibold">
          Japan Auction Sourcing
        </p>
        <h1 className="text-3xl font-bold text-white font-['Outfit'] mt-1">
          Pre-Order Requests
        </h1>
        <p className="text-sm text-[#b0b0b0] mt-1">
          Review custom vehicle sourcing requests, budgets, and follow up with
          buyers directly on WhatsApp.
        </p>
      </div>

      <PreOrdersManager initialPreOrders={rows} />
    </div>
  );
}
