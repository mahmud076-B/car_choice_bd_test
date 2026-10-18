import type { Metadata } from "next";
import StockCatalog from "./StockCatalog";
import { listPublishedVehicles } from "@/lib/vehicles";
import type { StockFilters } from "@/lib/types";

export const metadata: Metadata = {
  title: "Live Stock | Japanese Reconditioned Cars | Car Choice BD",
  description:
    "Browse certified Japanese reconditioned vehicles available at Car Choice BD Rajshahi showroom and ports. Filter by make, year, grade, mileage, and fuel type.",
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function first(
  value: string | string[] | undefined
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function StockPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const filters: StockFilters = {
    keyword: first(sp.keyword),
    make: first(sp.make),
    model: first(sp.model),
    year: first(sp.year),
    color: first(sp.color),
    grade: first(sp.grade),
    fuel: first(sp.fuel),
    status: first(sp.status),
    body: first(sp.body),
    mileageMin: first(sp.mileageMin),
    mileageMax: first(sp.mileageMax),
    view: first(sp.view) === "table" ? "table" : first(sp.view) === "card" ? "card" : undefined,
    page: first(sp.page),
  };

  const vehicles = await listPublishedVehicles();

  return <StockCatalog vehicles={vehicles} filters={filters} />;
}
