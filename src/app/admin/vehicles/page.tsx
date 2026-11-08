import Link from "next/link";
import { Plus } from "lucide-react";
import { adminListVehicles } from "@/lib/adminVehicles";
import AdminVehicleTable from "@/components/admin/AdminVehicleTable";

export default async function AdminVehiclesPage() {
  const vehicles = await adminListVehicles();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#d4af37] font-semibold">
            Inventory Console
          </p>
          <h1 className="text-3xl font-bold text-white font-['Outfit'] mt-1">
            Showroom & Port Vehicles
          </h1>
          <p className="text-sm text-[#b0b0b0] mt-1">
            Publish, edit, feature, or update stock status across your live
            catalog ({vehicles.length} total).
          </p>
        </div>
        <Link
          href="/admin/vehicles/new"
          className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add New Vehicle
        </Link>
      </div>

      <AdminVehicleTable initialVehicles={vehicles} />
    </div>
  );
}
