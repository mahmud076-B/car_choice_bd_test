import Link from "next/link";
import VehicleForm from "@/components/admin/VehicleForm";

export default function NewVehiclePage() {
  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-white/10">
        <Link
          href="/admin/vehicles"
          className="text-xs font-semibold text-[#d4af37] hover:underline"
        >
          ← Back to Vehicles
        </Link>
        <h1 className="text-3xl font-bold text-white font-['Outfit'] mt-2">
          Add New Vehicle
        </h1>
        <p className="text-sm text-[#b0b0b0] mt-1">
          Enter Japanese auction specifications, showroom status, pricing, and
          gallery / auction sheet photos.
        </p>
      </div>
      <VehicleForm />
    </div>
  );
}
