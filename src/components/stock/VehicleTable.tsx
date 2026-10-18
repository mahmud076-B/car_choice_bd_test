import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { vehicleWhatsAppUrl } from "@/lib/whatsapp";
import { MessageSquare } from "lucide-react";

export default function VehicleTable({
  vehicles,
  startIndex = 0,
}: {
  vehicles: Vehicle[];
  startIndex?: number;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0b1426]/55 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <table className="min-w-[900px] w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-[#d4af37] bg-white/[0.04]">
            <th className="px-4 py-3 font-bold">#</th>
            <th className="px-4 py-3 font-bold">Car Model</th>
            <th className="px-4 py-3 font-bold">Year</th>
            <th className="px-4 py-3 font-bold">Color</th>
            <th className="px-4 py-3 font-bold">Package</th>
            <th className="px-4 py-3 font-bold">Point</th>
            <th className="px-4 py-3 font-bold">Mileage</th>
            <th className="px-4 py-3 font-bold">Fuel</th>
            <th className="px-4 py-3 font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v, i) => (
            <tr
              key={v.id}
              className="border-b border-white/10 hover:bg-[#d4af37]/10 focus-within:bg-[#d4af37]/10 transition-colors"
            >
              <td className="px-4 py-3 text-[#b0b0b0] font-mono text-xs">
                {startIndex + i + 1}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/stock/${v.slug}`}
                  className="font-bold text-white hover:text-[#d4af37]"
                >
                  {v.make} {v.model}
                </Link>
              </td>
              <td className="px-4 py-3 font-semibold text-white">{v.year}</td>
              <td className="px-4 py-3 text-[#b0b0b0] max-w-[120px] truncate">
                {v.color}
              </td>
              <td className="px-4 py-3 text-xs text-white">{v.package}</td>
              <td className="px-4 py-3 font-mono text-xs text-[#d4af37] font-bold">
                {v.grade}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-[#b0b0b0]">
                {v.mileage.toLocaleString()} km
              </td>
              <td className="px-4 py-3 text-[#b0b0b0]">{v.fuelType}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/stock/${v.slug}`}
                    className="text-xs text-[#d4af37] font-semibold hover:underline"
                  >
                    Details
                  </Link>
                  <a
                    href={vehicleWhatsAppUrl(v)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#6ee7a0]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WA
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
