"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Calendar, Gauge, Fuel, ShieldCheck, MapPin, Eye } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { vehicleWhatsAppUrl } from "@/lib/whatsapp";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const whatsappUrl = vehicleWhatsAppUrl(vehicle);

  return (
    <div className="group glass-card flex flex-col overflow-hidden transition-all hover:border-[#d4af37]/40">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
        <Image
          src={vehicle.imageUrl}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <span
            className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase ${
              vehicle.status === "READY_STOCK"
                ? "bg-[#25d366]/15 text-[#6ee7a0] border border-[#25d366]/35 backdrop-blur-sm"
                : "bg-[#d4af37] text-[#0b1426]"
            }`}
          >
            {vehicle.statusLabel}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-black/70 text-[#d4af37] border border-[#d4af37]/30 backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            Grade {vehicle.grade}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 text-[11px] text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1 border border-white/10">
          <MapPin className="w-3 h-3 text-[#d4af37]" />
          {vehicle.location}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white line-clamp-1">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-xs text-[#d4af37] font-semibold mt-0.5">
            {vehicle.package}
          </p>
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-xs text-[#b0b0b0]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {vehicle.year}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5" />
              {vehicle.mileage.toLocaleString()} km
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="w-3.5 h-3.5" />
              {vehicle.fuelType}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] uppercase text-white/40">
              {vehicle.priceMode === "EXACT" ? "Price" : "Pricing"}
            </span>
            <span className="text-lg font-bold text-white font-mono">
              {vehicle.priceDisplay}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/stock/${vehicle.slug}`}
              className="flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <Eye className="w-3.5 h-3.5" />
              View Specs
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex items-center justify-center gap-1.5 py-2 rounded-md text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
