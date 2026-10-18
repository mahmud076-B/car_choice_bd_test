import VehicleForm from "@/components/admin/VehicleForm";

export default function NewVehiclePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white font-['Outfit'] mb-6">
        Add vehicle
      </h1>
      <VehicleForm />
    </div>
  );
}
