import Link from "next/link";
import { Suspense } from "react";
import { MessageSquare } from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import FilterPanel from "@/components/stock/FilterPanel";
import VehicleTable from "@/components/stock/VehicleTable";
import ViewToggle from "@/components/stock/ViewToggle";
import StaggerReveal from "@/components/StaggerReveal";
import { filterVehicles, paginateVehicles } from "@/lib/filterVehicles";
import { PAGE_SIZE } from "@/lib/constants";
import { stockListInquiryUrl } from "@/lib/whatsapp";
import type { StockFilters, Vehicle } from "@/lib/types";

interface StockCatalogProps {
  vehicles: Vehicle[];
  filters: StockFilters;
}

function Pagination({
  page,
  totalPages,
  filters,
}: {
  page: number;
  totalPages: number;
  filters: StockFilters;
}) {
  if (totalPages <= 1) return null;
  const hrefFor = (p: number) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v && k !== "page") params.set(k, String(v));
    });
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/stock?${qs}` : "/stock";
  };
  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      {page > 1 && (
        <Link
          href={hrefFor(page - 1)}
          className="px-4 py-2 rounded-md text-xs font-semibold border border-white/10 bg-[#0f0f0f]/80 text-white hover:border-[#d4af37]"
        >
          Previous
        </Link>
      )}
      <span className="text-xs text-[#b0b0b0]">
        Page {page} of {totalPages}
      </span>
      {page < totalPages && (
        <Link
          href={hrefFor(page + 1)}
          className="px-4 py-2 rounded-md text-xs font-semibold border border-white/10 bg-[#0f0f0f]/80 text-white hover:border-[#d4af37]"
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default function StockCatalog({ vehicles, filters }: StockCatalogProps) {
  const filtered = filterVehicles(vehicles, filters);
  const { items, page, totalPages, total } = paginateVehicles(
    filtered,
    filters.page
  );
  const view =
    filters.view === "table" || filters.view === "card"
      ? filters.view
      : "table";
  const startIndex = (page - 1) * PAGE_SIZE;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex items-center gap-2 text-xs text-[#b0b0b0] mb-4">
        <Link href="/" className="hover:text-[#d4af37]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#d4af37] font-medium">Stock List</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold font-['Outfit'] text-white">
            Live Stock
          </h1>
          <p className="text-sm text-[#b0b0b0] mt-1">
            {total} vehicle{total === 1 ? "" : "s"} found with your current
            filters.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Suspense fallback={null}>
            <ViewToggle active={view} />
          </Suspense>
          <a
            href={stockListInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs"
          >
            <MessageSquare className="w-4 h-4" />
            Request PDF Stock
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <Suspense
            fallback={
              <div className="h-96 rounded-xl bg-[#0f0f0f]/80 border border-white/10 animate-pulse" />
            }
          >
            <FilterPanel vehicles={vehicles} />
          </Suspense>
        </div>
        <div className="lg:col-span-9 space-y-4">
          {items.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-[#0f0f0f]/80 p-12 text-center">
              <p className="font-semibold text-white">No vehicles match</p>
              <Link href="/stock" className="text-sm text-[#d4af37] mt-2 inline-block">
                Clear filters
              </Link>
            </div>
          ) : view === "card" ? (
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {items.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </StaggerReveal>
          ) : (
            <VehicleTable vehicles={items} startIndex={startIndex} />
          )}
          <Pagination page={page} totalPages={totalPages} filters={filters} />
        </div>
      </div>
    </div>
  );
}
