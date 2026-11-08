"use client";

import { useState, useTransition } from "react";
import {
  MessageSquare,
  Phone,
  Mail,
  Trash2,
  Globe2,
  CheckCircle2,
} from "lucide-react";
import {
  deletePreOrderAction,
  updatePreOrderStatusAction,
} from "@/app/actions/leads";
import { customerWhatsAppUrl, formatBdt } from "@/lib/whatsapp";
import type { LocalPreOrder } from "@/lib/leads";
import type { InquiryStatus } from "@/lib/types";

export default function PreOrdersManager({
  initialPreOrders,
}: {
  initialPreOrders: LocalPreOrder[];
}) {
  const [rows, setRows] = useState(initialPreOrders);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [pending, startTransition] = useTransition();

  const filtered = rows.filter((r) =>
    statusFilter === "ALL" ? true : r.status === statusFilter
  );

  function handleStatusChange(id: string, status: InquiryStatus) {
    setRows((curr) =>
      curr.map((item) => (item.id === id ? { ...item, status } : item))
    );
    startTransition(async () => {
      await updatePreOrderStatusAction(id, status);
    });
  }

  function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete pre-order request from "${name}"?`)) return;
    setRows((curr) => curr.filter((item) => item.id !== id));
    startTransition(async () => {
      await deletePreOrderAction(id);
    });
  }

  return (
    <div className="space-y-5">
      {/* Status Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-4 rounded-2xl bg-[#0f0f0f] border border-white/10">
        {[
          { key: "ALL", label: `All (${rows.length})` },
          {
            key: "NEW",
            label: `New (${rows.filter((r) => r.status === "NEW").length})`,
          },
          {
            key: "IN_PROGRESS",
            label: `Sourcing (${
              rows.filter((r) => r.status === "IN_PROGRESS").length
            })`,
          },
          {
            key: "CLOSED",
            label: `Closed (${
              rows.filter((r) => r.status === "CLOSED").length
            })`,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              statusFilter === tab.key
                ? "border-[#d4af37]/50 bg-[#d4af37]/15 text-[#d4af37]"
                : "border-white/10 bg-[#161616] text-[#b0b0b0] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 rounded-2xl border border-white/10 bg-[#0f0f0f] text-center">
          <CheckCircle2 className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
          <p className="text-sm font-semibold text-white">
            No pre-order requests match your filter
          </p>
          <p className="text-xs text-[#b0b0b0] mt-1">
            Japan auction sourcing requests submitted on /pre-order will appear
            here.
          </p>
        </div>
      ) : (
        <div className={`space-y-3.5 ${pending ? "opacity-80" : ""}`}>
          {filtered.map((row) => {
            const desiredCar =
              [row.preferred_make, row.preferred_model]
                .filter(Boolean)
                .join(" ") || "Custom Japanese Vehicle";

            return (
              <article
                key={row.id}
                className={`p-5 rounded-2xl bg-[#0f0f0f] border transition-colors ${
                  row.status === "NEW"
                    ? "border-[#d4af37]/40 shadow-[0_0_24px_rgba(212,175,55,0.08)]"
                    : "border-white/10"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#d4af37]/40 bg-[#d4af37]/15 text-[#d4af37]">
                        <Globe2 className="w-3 h-3" />
                        Japan Pre-Order
                      </span>
                      <span className="text-xs text-[#b0b0b0]">
                        {new Date(row.created_at).toLocaleString()}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-white font-['Outfit'] pt-1">
                      {row.name}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#b0b0b0]">
                      <a
                        href={`tel:${row.phone}`}
                        className="inline-flex items-center gap-1.5 text-white hover:text-[#d4af37]"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                        {row.phone}
                      </a>
                      {row.email && (
                        <a
                          href={`mailto:${row.email}`}
                          className="inline-flex items-center gap-1.5 hover:text-[#d4af37]"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                          {row.email}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={customerWhatsAppUrl(
                        row.phone,
                        `Assalamu Alaikum ${row.name}, this is Car Choice BD (Rajshahi) regarding your Japan pre-order request for ${desiredCar}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Reply Customer on WA
                    </a>

                    <select
                      value={row.status}
                      onChange={(e) =>
                        handleStatusChange(
                          row.id,
                          e.target.value as InquiryStatus
                        )
                      }
                      aria-label="Pre-order status"
                      className={`rounded-xl px-3 py-2 text-xs font-bold border focus:outline-none ${
                        row.status === "NEW"
                          ? "bg-[#d4af37]/15 border-[#d4af37]/45 text-[#d4af37]"
                          : row.status === "IN_PROGRESS"
                            ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                            : "bg-[#161616] border-white/12 text-[#b0b0b0]"
                      }`}
                    >
                      <option value="NEW" className="bg-[#0f0f0f] text-white">
                        NEW
                      </option>
                      <option
                        value="IN_PROGRESS"
                        className="bg-[#0f0f0f] text-white"
                      >
                        IN_PROGRESS
                      </option>
                      <option
                        value="CLOSED"
                        className="bg-[#0f0f0f] text-white"
                      >
                        CLOSED
                      </option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDelete(row.id, row.name)}
                      className="p-2 rounded-xl text-red-300/80 hover:text-red-200 hover:bg-red-500/15 border border-transparent hover:border-red-500/30 transition-colors"
                      title="Delete pre-order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Spec Summary Pills */}
                <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="px-3 py-1 rounded-lg bg-[#161616] border border-white/10 text-white font-semibold">
                    Vehicle:{" "}
                    <span className="text-[#d4af37]">{desiredCar}</span>
                  </span>
                  {(row.year_min || row.year_max) && (
                    <span className="px-3 py-1 rounded-lg bg-[#161616] border border-white/10 text-[#b0b0b0]">
                      Year: {row.year_min ?? "Any"} – {row.year_max ?? "Any"}
                    </span>
                  )}
                  {row.budget_bdt && (
                    <span className="px-3 py-1 rounded-lg bg-[#161616] border border-[#d4af37]/30 text-[#d4af37] font-mono font-bold">
                      Target Budget: {formatBdt(Number(row.budget_bdt))}
                    </span>
                  )}
                </div>

                {row.notes && (
                  <p className="text-sm text-white/85 mt-3 whitespace-pre-wrap leading-relaxed bg-[#161616] p-3.5 rounded-xl border border-white/5">
                    {row.notes}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

