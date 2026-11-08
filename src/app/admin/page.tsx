import Link from "next/link";
import Image from "next/image";
import {
  Car,
  MessageSquare,
  Globe2,
  Award,
  Calculator,
  Plus,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { listPublishedVehicles, listAllVehiclesAdmin } from "@/lib/vehicles";
import { listInquiriesLocal, listPreOrdersLocal } from "@/lib/leads";
import { listDeliveredCars } from "@/lib/delivered";
import { listDutySheet } from "@/lib/duty";
import { customerWhatsAppUrl, formatBdt } from "@/lib/whatsapp";

export default async function AdminDashboardPage() {
  const [all, published, inquiries, preOrders, delivered, duty] =
    await Promise.all([
      listAllVehiclesAdmin(),
      listPublishedVehicles(),
      listInquiriesLocal(),
      listPreOrdersLocal(),
      listDeliveredCars(),
      listDutySheet(),
    ]);

  const readyCount = all.filter((v) => v.status === "READY_STOCK").length;
  const portCount = all.filter(
    (v) => v.status === "PORT_STOCK" || v.status === "IN_TRANSIT"
  ).length;
  const newInquiries = inquiries.filter((i) => i.status === "NEW");
  const newPreOrders = preOrders.filter((p) => p.status === "NEW");

  const cards = [
    {
      label: "Total Vehicles",
      value: all.length,
      sub: `${published.length} published · ${readyCount} ready · ${portCount} port`,
      href: "/admin/vehicles",
      icon: Car,
      highlight: false,
    },
    {
      label: "Customer Inquiries",
      value: inquiries.length,
      sub:
        newInquiries.length > 0
          ? `${newInquiries.length} new waiting reply`
          : "All caught up",
      href: "/admin/inquiries",
      icon: MessageSquare,
      highlight: newInquiries.length > 0,
    },
    {
      label: "Japan Pre-Orders",
      value: preOrders.length,
      sub:
        newPreOrders.length > 0
          ? `${newPreOrders.length} new sourcing requests`
          : "All caught up",
      href: "/admin/pre-orders",
      icon: Globe2,
      highlight: newPreOrders.length > 0,
    },
    {
      label: "Delivered Showcase",
      value: delivered.length,
      sub: "Published client handovers",
      href: "/admin/delivered-cars",
      icon: Award,
      highlight: false,
    },
    {
      label: "Showroom Duty Sheet",
      value: duty.length,
      sub: "Active calculator rows",
      href: "/admin/duty",
      icon: Calculator,
      highlight: false,
    },
  ];

  const recentVehicles = all.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#d4af37] font-semibold">
            Showroom Command Center
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit'] mt-1">
            Executive Dashboard
          </h1>
          <p className="text-sm text-[#b0b0b0] mt-1">
            Manage Rajshahi showroom & port stock, customer inquiries, Japan
            pre-orders, and duty lookup tables.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/vehicles/new"
            className="btn-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs"
          >
            <Plus className="w-4 h-4" />
            Add New Vehicle
          </Link>
          <Link
            href="/stock"
            className="btn-ghost inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs"
          >
            Preview Live Stock
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className={`group p-5 rounded-2xl bg-[#0f0f0f] border transition-all hover:-translate-y-0.5 ${
                c.highlight
                  ? "border-[#d4af37]/50 shadow-[0_0_25px_rgba(212,175,55,0.12)]"
                  : "border-white/10 hover:border-[#d4af37]/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-wider text-[#b0b0b0] font-semibold">
                  {c.label}
                </p>
                <span className="w-8 h-8 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-[#0b1426] transition-colors">
                  <Icon className="w-4 h-4" />
                </span>
              </div>
              <p className="text-3xl font-extrabold text-white mt-3 font-mono">
                {c.value}
              </p>
              <p className="text-xs text-[#d4af37] mt-1.5 font-medium">
                {c.sub}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Two-Column Operational Split: Attention Queue + Recent Stock */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: New Leads Queue */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0f0f0f] border border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold">
                  Lead Inbox
                </p>
                <h2 className="text-lg font-bold text-white font-['Outfit'] mt-0.5">
                  Needs Staff Attention
                </h2>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
                {newInquiries.length + newPreOrders.length} New
              </span>
            </div>

            {newInquiries.length === 0 && newPreOrders.length === 0 ? (
              <div className="py-10 text-center border border-dashed border-white/10 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-[#6ee7a0] mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">
                  All leads have been reviewed
                </p>
                <p className="text-xs text-[#b0b0b0] mt-1">
                  New Contact, Auction Sheet Verify, and Pre-Order submissions
                  will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {newInquiries.slice(0, 3).map((inq) => (
                  <div
                    key={inq.id}
                    className="p-3.5 rounded-xl bg-[#161616] border border-white/10 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#d4af37]/15 text-[#d4af37] font-semibold">
                          {inq.inquiry_type.replace(/_/g, " ")}
                        </span>
                        <p className="text-sm font-bold text-white mt-1">
                          {inq.name}
                        </p>
                        {inq.chassis && (
                          <p className="text-xs font-mono text-[#d4af37]">
                            Chassis: {inq.chassis}
                          </p>
                        )}
                      </div>
                      {inq.phone && (
                        <a
                          href={customerWhatsAppUrl(
                            inq.phone,
                            `Assalamu Alaikum ${inq.name}, this is Car Choice BD Rajshahi regarding your ${
                              inq.chassis
                                ? `auction sheet verification for ${inq.chassis}`
                                : "inquiry"
                            }.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-whatsapp px-2.5 py-1 rounded-lg text-[11px] shrink-0"
                        >
                          Reply WA
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-[#b0b0b0] line-clamp-2">
                      {inq.message}
                    </p>
                  </div>
                ))}

                {newPreOrders.slice(0, 2).map((po) => (
                  <div
                    key={po.id}
                    className="p-3.5 rounded-xl bg-[#161616] border border-white/10 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-semibold">
                          PRE-ORDER
                        </span>
                        <p className="text-sm font-bold text-white mt-1">
                          {po.name} ·{" "}
                          <span className="text-[#d4af37]">
                            {[po.preferred_make, po.preferred_model]
                              .filter(Boolean)
                              .join(" ") || "Custom Sourcing"}
                          </span>
                        </p>
                      </div>
                      <a
                        href={customerWhatsAppUrl(
                          po.phone,
                          `Assalamu Alaikum ${po.name}, this is Car Choice BD Rajshahi regarding your Japan pre-order request for ${[
                            po.preferred_make,
                            po.preferred_model,
                          ]
                            .filter(Boolean)
                            .join(" ")}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp px-2.5 py-1 rounded-lg text-[11px] shrink-0"
                      >
                        Reply WA
                      </a>
                    </div>
                    {po.budget_bdt && (
                      <p className="text-xs text-[#b0b0b0]">
                        Budget: {formatBdt(Number(po.budget_bdt))}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <Link
              href="/admin/inquiries"
              className="text-[#d4af37] font-semibold hover:underline inline-flex items-center gap-1"
            >
              All Inquiries <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/admin/pre-orders"
              className="text-[#d4af37] font-semibold hover:underline inline-flex items-center gap-1"
            >
              All Pre-Orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Recent Inventory */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0f0f0f] border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold">
                Live Stock Catalog
              </p>
              <h2 className="text-lg font-bold text-white font-['Outfit'] mt-0.5">
                Recent Vehicles
              </h2>
            </div>
            <Link
              href="/admin/vehicles"
              className="text-xs font-semibold text-[#d4af37] hover:underline inline-flex items-center gap-1"
            >
              Manage All ({all.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-[#b0b0b0]">
                  <th className="pb-3 font-semibold">Vehicle</th>
                  <th className="pb-3 font-semibold">Stock Status</th>
                  <th className="pb-3 font-semibold">Visibility</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {recentVehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-9 rounded-lg overflow-hidden bg-black border border-white/10 shrink-0">
                          <Image
                            src={v.imageUrl}
                            alt={`${v.year} ${v.make} ${v.model}`}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs sm:text-sm">
                            {v.year} {v.make} {v.model}
                          </p>
                          <p className="text-[11px] text-[#b0b0b0]">
                            {v.package} · Grade {v.grade}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          v.status === "READY_STOCK"
                            ? "bg-[#25d366]/15 text-[#6ee7a0] border border-[#25d366]/35"
                            : v.status === "SOLD"
                              ? "bg-white/10 text-[#b0b0b0]"
                              : "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/35"
                        }`}
                      >
                        {v.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3 pr-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          v.publicationStatus === "PUBLISHED"
                            ? "text-[#6ee7a0]"
                            : "text-[#b0b0b0]"
                        }`}
                      >
                        {v.publicationStatus === "PUBLISHED" ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {v.publicationStatus}
                      </span>
                    </td>
                    <td className="py-3 pr-3 font-mono text-xs text-white">
                      {v.priceDisplay}
                    </td>
                    <td className="py-3 text-right space-x-2.5 text-xs">
                      <Link
                        href={`/admin/vehicles/${v.id}`}
                        className="font-semibold text-[#d4af37] hover:underline"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/stock/${v.slug}`}
                        className="text-[#b0b0b0] hover:text-white"
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
      </div>
    </div>
  );
}
