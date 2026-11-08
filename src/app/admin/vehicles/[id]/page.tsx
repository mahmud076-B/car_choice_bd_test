import Link from "next/link";
import { notFound } from "next/navigation";
import VehicleForm from "@/components/admin/VehicleForm";
import { adminGetVehicle } from "@/lib/adminVehicles";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditVehiclePage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await adminGetVehicle(id);
  if (!vehicle) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <Link
            href="/admin/vehicles"
            className="text-xs font-semibold text-[#d4af37] hover:underline"
          >
            ← Back to Vehicles
          </Link>
          <h1 className="text-3xl font-bold text-white font-['Outfit'] mt-2">
            Edit {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <p className="text-sm text-[#b0b0b0] mt-1">
            {vehicle.package} · Chassis {vehicle.chassisPrefix || "—"}
          </p>
        </div>
        <Link
          href={`/stock/${vehicle.slug}`}
          className="btn-ghost px-4 py-2 rounded-full text-xs"
        >
          View Public Listing ↗
        </Link>
      </div>
      <VehicleForm vehicle={vehicle} />
    </div>
  );
}
