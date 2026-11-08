"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Edit3,
  ExternalLink,
  Trash2,
  Star,
  ShieldCheck,
} from "lucide-react";
import {
  deleteVehicleAction,
  quickUpdateVehicleAction,
} from "@/app/actions/vehicles";
import type {
  InventoryStatus,
  PublicationStatus,
  Vehicle,
} from "@/lib/types";

const STATUS_LABELS: Record<InventoryStatus, string> = {
  READY_STOCK: "Ready in Showroom",
  PORT_STOCK: "Arrived at Port",
  IN_TRANSIT: "In Transit from Japan",
  RESERVED: "Reserved",
  SOLD: "Sold",
};

export default function AdminVehicleTable({
  initialVehicles,
}: {
  initialVehicles: Vehicle[];
}) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [pending, startTransition] = useTransition();
  const [banner, setBanner] = useState<string | null>(null);

  const filtered = vehicles.filter((v) => {
    if (statusFilter === "DRAFT") {
      if (v.publicationStatus !== "DRAFT") return false;
    } else if (statusFilter !== "ALL") {
      if (v.status !== statusFilter) return false;
    }
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.package.toLowerCase().includes(q) ||
      v.chassisPrefix.toLowerCase().includes(q) ||
      String(v.year).includes(q)
    );
  });

  function handleQuickStatus(id: string, nextStatus: InventoryStatus) {
    const nextLabel = STATUS_LABELS[nextStatus] ?? "Available";
    setVehicles((curr) =>
      curr.map((v) =>
        v.id === id ? { ...v, status: nextStatus, statusLabel: nextLabel } : v
      )
    );
    startTransition(async () => {
      const res = await quickUpdateVehicleAction(id, {
        status: nextStatus,
        statusLabel: nextLabel,
      });
      setBanner(res.message);
    });
  }

  function handleQuickPub(id: string, nextPub: PublicationStatus) {
    setVehicles((curr) =>
      curr.map((v) =>
        v.id === id ? { ...v, publicationStatus: nextPub } : v
      )
    );
    startTransition(async () => {
      const res = await quickUpdateVehicleAction(id, {
        publicationStatus: nextPub,
      });
      setBanner(res.message);
    });
  }

  function handleToggleFeatured(id: string, nextFeatured: boolean) {
    setVehicles((curr) =>
      curr.map((v) => (v.id === id ? { ...v, featured: nextFeatured } : v))
    );
    startTransition(async () => {
      const res = await quickUpdateVehicleAction(id, {
        featured: nextFeatured,
      });
      setBanner(res.message);
    });
  }

  function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}" from inventory?`)) return;
    setVehicles((curr) => curr.filter((v) => v.id !== id));
    startTransition(async () => {
      const res = await deleteVehicleAction(id);
      setBanner(res.message);
    });
  }

  return (
    <div className="space-y-4">
      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0f0f0f] border border-white/10">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by make, model, chassis, or year…"
            className="w-full bg-[#161616] border border-white/12 rounded-xl pl-10 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { key: "ALL", label: "All" },
            { key: "READY_STOCK", label: "Ready Stock" },
            { key: "PORT_STOCK", label: "Port Stock" },
            { key: "IN_TRANSIT", label: "In Transit" },
            { key: "SOLD", label: "Sold" },
            { key: "DRAFT", label: "Drafts" },
          ].map((tab) => {
            const active = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  active
                    ? "border-[#d4af37]/50 bg-[#d4af37]/15 text-[#d4af37]"
                    : "border-white/10 bg-[#161616] text-[#b0b0b0] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {banner && (
        <div className="text-xs px-4 py-2.5 rounded-xl border border-[#d4af37]/35 bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-between">
          <span>{banner}</span>
          <button
            type="button"
            onClick={() => setBanner(null)}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Vehicles Table */}
      <div
        className={`overflow-x-auto rounded-2xl border border-white/10 bg-[#0f0f0f] ${
          pending ? "opacity-75" : ""
        }`}
      >
        <table className="min-w-[920px] w-full text-sm text-left">
          <thead className="bg-white/[0.03] border-b border-white/10 text-[11px] uppercase tracking-wider text-[#d4af37]">
            <tr>
              <th className="px-4 py-3.5 font-bold">Vehicle</th>
              <th className="px-4 py-3.5 font-bold">Specs & Chassis</th>
              <th className="px-4 py-3.5 font-bold">Stock Status</th>
              <th className="px-4 py-3.5 font-bold">Publication</th>
              <th className="px-4 py-3.5 font-bold">Price</th>
              <th className="px-4 py-3.5 font-bold text-center">Featured</th>
              <th className="px-4 py-3.5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm text-[#b0b0b0]"
                >
                  No vehicles match your current search or filter.
                </td>
              </tr>
            ) : (
              filtered.map((v) => (
                <tr
                  key={v.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-11 rounded-lg overflow-hidden bg-black border border-white/10 shrink-0">
                        <Image
                          src={v.imageUrl}
                          alt={`${v.year} ${v.make} ${v.model}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/admin/vehicles/${v.id}`}
                          className="font-bold text-white hover:text-[#d4af37] transition-colors"
                        >
                          {v.year} {v.make} {v.model}
                        </Link>
                        <p className="text-xs text-[#d4af37] font-medium">
                          {v.package || "Standard"}
                        </p>
                        <p className="text-[11px] text-[#b0b0b0]">
                          {v.location}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="space-y-0.5 text-xs">
                      <p className="font-mono text-white">
                        {v.chassisPrefix || "—"}
                      </p>
                      <p className="text-[#b0b0b0] inline-flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                        Grade {v.grade} · {v.mileage.toLocaleString("en-IN")} km
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <select
                      value={v.status}
                      onChange={(e) =>
                        handleQuickStatus(
                          v.id,
                          e.target.value as InventoryStatus
                        )
                      }
                      aria-label="Stock status"
                      className="bg-[#161616] border border-white/12 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="READY_STOCK" className="bg-[#0f0f0f]">
                        READY_STOCK
                      </option>
                      <option value="PORT_STOCK" className="bg-[#0f0f0f]">
                        PORT_STOCK
                      </option>
                      <option value="IN_TRANSIT" className="bg-[#0f0f0f]">
                        IN_TRANSIT
                      </option>
                      <option value="RESERVED" className="bg-[#0f0f0f]">
                        RESERVED
                      </option>
                      <option value="SOLD" className="bg-[#0f0f0f]">
                        SOLD
                      </option>
                    </select>
                  </td>

                  <td className="px-4 py-3.5">
                    <select
                      value={v.publicationStatus}
                      onChange={(e) =>
                        handleQuickPub(
                          v.id,
                          e.target.value as PublicationStatus
                        )
                      }
                      aria-label="Publication status"
                      className={`border rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none ${
                        v.publicationStatus === "PUBLISHED"
                          ? "bg-[#25d366]/15 border-[#25d366]/35 text-[#6ee7a0]"
                          : "bg-[#161616] border-white/12 text-[#b0b0b0]"
                      }`}
                    >
                      <option value="PUBLISHED" className="bg-[#0f0f0f] text-white">
                        PUBLISHED
                      </option>
                      <option value="DRAFT" className="bg-[#0f0f0f] text-white">
                        DRAFT
                      </option>
                      <option value="ARCHIVED" className="bg-[#0f0f0f] text-white">
                        ARCHIVED
                      </option>
                    </select>
                  </td>

                  <td className="px-4 py-3.5 font-mono text-xs font-semibold text-white">
                    {v.priceDisplay}
                  </td>

                  <td className="px-4 py-3.5 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(v.id, !v.featured)}
                      aria-label="Toggle featured"
                      className={`p-1.5 rounded-lg border transition-colors ${
                        v.featured
                          ? "border-[#d4af37]/45 bg-[#d4af37]/15 text-[#d4af37]"
                          : "border-white/10 bg-[#161616] text-white/30 hover:text-white"
                      }`}
                    >
                      <Star
                        className="w-4 h-4"
                        fill={v.featured ? "currentColor" : "none"}
                      />
                    </button>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <Link
                        href={`/admin/vehicles/${v.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-[#0b1426] transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </Link>
                      <Link
                        href={`/stock/${v.slug}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-[#b0b0b0] border border-white/10 hover:text-white"
                        title="View on public site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            v.id,
                            `${v.year} ${v.make} ${v.model}`
                          )
                        }
                        className="inline-flex items-center p-1.5 rounded-lg text-xs text-red-300/80 hover:text-red-200 hover:bg-red-500/15 border border-transparent hover:border-red-500/30 transition-colors"
                        title="Delete vehicle"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

