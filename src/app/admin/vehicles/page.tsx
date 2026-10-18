import Link from "next/link";
import { adminListVehicles } from "@/lib/adminVehicles";

export default async function AdminVehiclesPage() {
  const vehicles = await adminListVehicles();

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white font-['Outfit']">
          Vehicles
        </h1>
        <Link
          href="/admin/vehicles/new"
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-[#D4AF37]"
        >
          Add vehicle
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-[#0B111E] text-xs uppercase text-slate-400">
            <tr>
              <th className="text-left px-4 py-3">Vehicle</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Pub</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-t border-white/5">
                <td className="px-4 py-3">
                  <p className="text-white font-semibold">
                    {v.year} {v.make} {v.model}
                  </p>
                  <p className="text-xs text-slate-500">{v.slug}</p>
                </td>
                <td className="px-4 py-3 text-xs">{v.status}</td>
                <td className="px-4 py-3 text-xs">{v.publicationStatus}</td>
                <td className="px-4 py-3 text-xs">{v.priceDisplay}</td>
                <td className="px-4 py-3 space-x-3 text-xs">
                  <Link
                    href={`/admin/vehicles/${v.id}`}
                    className="text-[#D4AF37] hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/stock/${v.slug}`}
                    className="text-slate-400 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
