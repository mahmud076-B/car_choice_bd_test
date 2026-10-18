"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import StaggerReveal from "@/components/StaggerReveal";
import type { Vehicle } from "@/lib/types";

export default function FeaturedStock({ vehicles }: { vehicles: Vehicle[] }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filtered = vehicles.filter((vehicle) => {
    if (selectedCategory === "ALL") return true;
    if (selectedCategory === "SUV") return vehicle.bodyType === "SUV / Crossover";
    if (selectedCategory === "SEDAN") return vehicle.bodyType === "Sedan";
    if (selectedCategory === "HYBRID") return vehicle.fuelType === "Hybrid";
    if (selectedCategory === "MPV") return vehicle.bodyType === "Van / MPV";
    return true;
  });

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
            Immediate Availability
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 font-['Outfit']">
            Featured Ready Stock
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Inspected Japanese reconditioned vehicles ready for showroom visit
            or port delivery.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 bg-[#0E1526] p-1.5 rounded-xl border border-white/10">
          {[
            { id: "ALL", label: "All" },
            { id: "SUV", label: "SUV" },
            { id: "SEDAN", label: "Sedan" },
            { id: "HYBRID", label: "Hybrid" },
            { id: "MPV", label: "MPV" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === tab.id
                  ? "bg-[#D4AF37] text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.slice(0, 6).map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </StaggerReveal>

      <div className="mt-10 text-center">
        <Link
          href="/stock"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:underline"
        >
          View full live stock
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
