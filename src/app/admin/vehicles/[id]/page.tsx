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
    <div>
      <h1 className="text-2xl font-bold text-white font-['Outfit'] mb-6">
        Edit {vehicle.make} {vehicle.model}
      </h1>
      <VehicleForm vehicle={vehicle} />
    </div>
  );
}
