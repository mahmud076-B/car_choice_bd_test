"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function HomeSearchBar({ stockCount }: { stockCount: number }) {
  const [make, setMake] = useState("ALL");
  const [body, setBody] = useState("ALL");
  const [year, setYear] = useState("ALL");

  const href = useMemo(() => {
    const params = new URLSearchParams();
    if (make !== "ALL") params.set("make", make);
    if (body !== "ALL") params.set("body", body);
    if (year !== "ALL") params.set("year", year);
    const qs = params.toString();
    return qs ? `/stock?${qs}` : "/stock";
  }, [make, body, year]);

  const field =
    "w-full bg-[#141E33] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]";

  return (
    <div className="w-full max-w-5xl bg-[#0B111E]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/80">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Brand / Make
          </label>
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className={field}
          >
            <option value="ALL">All Japanese Brands</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Nissan">Nissan</option>
            <option value="Lexus">Lexus</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Body / Category
          </label>
          <select
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={field}
          >
            <option value="ALL">All Categories</option>
            <option value="SUV">Luxury SUV / Crossover</option>
            <option value="Sedan">Executive Sedan</option>
            <option value="MPV">Family MPV / Van</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Year
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={field}
          >
            <option value="ALL">Any Year</option>
            {[2024, 2023, 2022, 2021, 2020].map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col justify-end">
          <Link
            href={href}
            className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C99C20] hover:brightness-110 transition-all shadow-md active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Search Stock ({stockCount})</span>
          </Link>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <span className="text-slate-500">Popular:</span>
        {["Harrier", "Prado", "Vezel", "Premio", "Noah"].map((model) => (
          <Link
            key={model}
            href={`/stock?model=${model}`}
            className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300"
          >
            {model}
          </Link>
        ))}
      </div>
    </div>
  );
}
