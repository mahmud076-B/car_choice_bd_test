"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { X } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { uniqueValues } from "@/lib/filterVehicles";

export default function FilterPanel({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const makes = uniqueValues(vehicles, "make");
  const years = uniqueValues(vehicles, "year");
  const colors = uniqueValues(vehicles, "color");
  const fuels = uniqueValues(vehicles, "fuelType");
  const grades = uniqueValues(vehicles, "grade");
  const statuses = uniqueValues(vehicles, "status");

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value || value === "ALL") params.delete(key);
      else params.set(key, value);
      params.delete("page");
      startTransition(() => {
        router.push(params.toString() ? `/stock?${params}` : "/stock");
      });
    },
    [router, searchParams]
  );

  const clearAll = () => {
    const view = searchParams.get("view");
    startTransition(() => {
      router.push(view ? `/stock?view=${view}` : "/stock");
    });
  };

  const get = (key: string) => searchParams.get(key) ?? "";
  const fieldClass =
    "w-full bg-[#0f0f0f]/80 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]";

  return (
    <aside
      className={`rounded-xl bg-[#0f0f0f]/80 border border-white/10 shadow-sm p-5 space-y-4 ${
        isPending ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-['Outfit'] text-white">
          Filters
        </h2>
        <button
          type="button"
          onClick={clearAll}
          className="text-xs font-semibold text-[#d4af37] hover:underline inline-flex items-center gap-1"
        >
          <X className="w-3.5 h-3.5" />
          Clear All
        </button>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] uppercase tracking-wider text-[#b0b0b0] font-semibold">
          Keyword
        </label>
        <input
          type="search"
          defaultValue={get("keyword")}
          placeholder="Search anything"
          className={fieldClass}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              update("keyword", (e.target as HTMLInputElement).value.trim());
          }}
          onBlur={(e) => update("keyword", e.target.value.trim())}
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] uppercase tracking-wider text-[#b0b0b0] font-semibold">
          Car Model / Make
        </label>
        <select
          className={fieldClass}
          value={get("make") || "ALL"}
          onChange={(e) => update("make", e.target.value)}
        >
          <option value="ALL">All Car Models</option>
          {makes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] uppercase tracking-wider text-[#b0b0b0] font-semibold">
          Year
        </label>
        <div className="grid grid-cols-2 gap-2">
          {years.map((y) => {
            const active = get("year") === y;
            return (
              <label
                key={y}
                className={`flex items-center gap-2 text-sm px-2 py-1.5 rounded-md border cursor-pointer ${
                  active
                    ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
                    : "border-white/10 text-white"
                }`}
              >
                <input
                  type="checkbox"
                  className="accent-[#d4af37]"
                  checked={active}
                  onChange={() => update("year", active ? "" : y)}
                />
                {y}
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] uppercase tracking-wider text-[#b0b0b0] font-semibold">
          Color
        </label>
        <select
          className={fieldClass}
          value={get("color") || "ALL"}
          onChange={(e) => update("color", e.target.value)}
        >
          <option value="ALL">All Colors</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] uppercase tracking-wider text-[#b0b0b0] font-semibold">
          Auction Point
        </label>
        <select
          className={fieldClass}
          value={get("grade") || "ALL"}
          onChange={(e) => update("grade", e.target.value)}
        >
          <option value="ALL">All Points</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] uppercase tracking-wider text-[#b0b0b0] font-semibold">
          Mileage Range (KM)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            className={fieldClass}
            defaultValue={get("mileageMin")}
            onBlur={(e) => update("mileageMin", e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className={fieldClass}
            defaultValue={get("mileageMax")}
            onBlur={(e) => update("mileageMax", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] uppercase tracking-wider text-[#b0b0b0] font-semibold">
          Fuel Type
        </label>
        <select
          className={fieldClass}
          value={get("fuel") || "ALL"}
          onChange={(e) => update("fuel", e.target.value)}
        >
          <option value="ALL">All Fuel Types</option>
          {fuels.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] uppercase tracking-wider text-[#b0b0b0] font-semibold">
          Stock Status
        </label>
        <select
          className={fieldClass}
          value={get("status") || "ALL"}
          onChange={(e) => update("status", e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
