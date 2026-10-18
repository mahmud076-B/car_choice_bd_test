import type { StockFilters, Vehicle } from "@/lib/types";
import { PAGE_SIZE } from "@/lib/constants";

export function filterVehicles(
  vehicles: Vehicle[],
  filters: StockFilters
): Vehicle[] {
  return vehicles.filter((v) => {
    if (v.publicationStatus && v.publicationStatus !== "PUBLISHED") {
      return false;
    }

    if (filters.keyword) {
      const q = filters.keyword.toLowerCase();
      const hay = [
        v.make,
        v.model,
        v.package,
        v.color,
        v.chassisPrefix,
        v.fuelType,
        v.grade,
        String(v.year),
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }

    if (filters.make && filters.make !== "ALL") {
      if (v.make.toLowerCase() !== filters.make.toLowerCase()) return false;
    }

    if (filters.model && filters.model !== "ALL") {
      const modelQ = filters.model.toLowerCase().replace(/[-_\s]/g, "");
      const modelV = v.model.toLowerCase().replace(/[-_\s]/g, "");
      if (!modelV.includes(modelQ) && !modelQ.includes(modelV)) return false;
    }

    if (filters.year && filters.year !== "ALL") {
      if (String(v.year) !== filters.year) return false;
    }

    if (filters.color && filters.color !== "ALL") {
      if (!v.color.toLowerCase().includes(filters.color.toLowerCase())) {
        return false;
      }
    }

    if (filters.grade && filters.grade !== "ALL") {
      if (!v.grade.toLowerCase().includes(filters.grade.toLowerCase())) {
        return false;
      }
    }

    if (filters.fuel && filters.fuel !== "ALL") {
      if (v.fuelType.toLowerCase() !== filters.fuel.toLowerCase()) return false;
    }

    if (filters.body && filters.body !== "ALL") {
      const body = filters.body.toLowerCase();
      if (body === "suv" && v.bodyType !== "SUV / Crossover") return false;
      if (body === "sedan" && v.bodyType !== "Sedan") return false;
      if (
        (body === "mpv" || body === "van") &&
        v.bodyType !== "Van / MPV"
      )
        return false;
      if (body === "hatchback" && v.bodyType !== "Hatchback") return false;
    }

    if (filters.status && filters.status !== "ALL") {
      if (v.status !== filters.status) return false;
    }

    if (filters.mileageMin) {
      const min = Number(filters.mileageMin);
      if (!Number.isNaN(min) && v.mileage < min) return false;
    }

    if (filters.mileageMax) {
      const max = Number(filters.mileageMax);
      if (!Number.isNaN(max) && v.mileage > max) return false;
    }

    return true;
  });
}

export function paginateVehicles(vehicles: Vehicle[], pageStr?: string) {
  const page = Math.max(1, Number(pageStr) || 1);
  const total = vehicles.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  return {
    items: vehicles.slice(start, start + PAGE_SIZE),
    page: safePage,
    totalPages,
    total,
  };
}

export function buildStockQuery(filters: StockFilters): string {
  const params = new URLSearchParams();
  const entries: [keyof StockFilters, string | undefined][] = [
    ["keyword", filters.keyword],
    ["make", filters.make],
    ["model", filters.model],
    ["year", filters.year],
    ["color", filters.color],
    ["grade", filters.grade],
    ["fuel", filters.fuel],
    ["status", filters.status],
    ["mileageMin", filters.mileageMin],
    ["mileageMax", filters.mileageMax],
    ["view", filters.view],
    ["page", filters.page],
  ];

  for (const [key, value] of entries) {
    if (value && value !== "ALL") params.set(key, value);
  }

  const qs = params.toString();
  return qs ? `/stock?${qs}` : "/stock";
}

export function uniqueValues(
  vehicles: Vehicle[],
  key: keyof Vehicle
): string[] {
  const set = new Set<string>();
  for (const v of vehicles) {
    const val = v[key];
    if (val != null) set.add(String(val));
  }
  return Array.from(set).sort();
}
