"use client";

import { useState, useTransition } from "react";
import {
  MessageSquare,
  Phone,
  Mail,
  Trash2,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";
import {
  deleteInquiryAction,
  updateInquiryStatusAction,
} from "@/app/actions/leads";
import { customerWhatsAppUrl } from "@/lib/whatsapp";
import type { LocalInquiry } from "@/lib/leads";
import type { InquiryStatus } from "@/lib/types";

export default function InquiriesManager({
  initialInquiries,
}: {
  initialInquiries: LocalInquiry[];
}) {
  const [items, setItems] = useState(initialInquiries);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [pending, startTransition] = useTransition();

  const filtered = items.filter((inq) => {
    if (statusFilter !== "ALL" && inq.status !== statusFilter) return false;
    if (typeFilter !== "ALL" && inq.inquiry_type !== typeFilter) return false;
    return true;
  });

  function handleStatusChange(id: string, status: InquiryStatus) {
    setItems((curr) =>
      curr.map((item) => (item.id === id ? { ...item, status } : item))
    );
    startTransition(async () => {
      await updateInquiryStatusAction(id, status);
    });
  }

  function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete inquiry from "${name}"?`)) return;
    setItems((curr) => curr.filter((item) => item.id !== id));
    startTransition(async () => {
      await deleteInquiryAction(id);
    });
  }

  return (
    <div className="space-y-5">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#0f0f0f] border border-white/10">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { key: "ALL", label: `All (${items.length})` },
            {
              key: "NEW",
              label: `New (${items.filter((i) => i.status === "NEW").length})`,
            },
            {
              key: "IN_PROGRESS",
              label: `In Progress (${
                items.filter((i) => i.status === "IN_PROGRESS").length
              })`,
            },
            {
              key: "CLOSED",
              label: `Closed (${
                items.filter((i) => i.status === "CLOSED").length
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

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { key: "ALL", label: "All Types" },
            { key: "AUCTION_VERIFY", label: "Auction Sheet Verify" },
            { key: "GENERAL_CONTACT", label: "General Contact" },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTypeFilter(t.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                typeFilter === t.key
                  ? "border-[#d4af37]/40 bg-white/[0.08] text-white"
                  : "border-white/10 bg-transparent text-[#b0b0b0] hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiry Cards */}
      {filtered.length === 0 ? (
        <div className="p-12 rounded-2xl border border-white/10 bg-[#0f0f0f] text-center">
          <CheckCircle2 className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
          <p className="text-sm font-semibold text-white">
            No inquiries match your filter
          </p>
          <p className="text-xs text-[#b0b0b0] mt-1">
            Customer Contact and Auction Sheet Verification requests appear
            here.
          </p>
        </div>
      ) : (
        <div className={`space-y-3.5 ${pending ? "opacity-80" : ""}`}>
          {filtered.map((inq) => {
            const isVerify = inq.inquiry_type === "AUCTION_VERIFY";
            return (
              <article
                key={inq.id}
                className={`p-5 rounded-2xl bg-[#0f0f0f] border transition-colors ${
                  inq.status === "NEW"
                    ? "border-[#d4af37]/40 shadow-[0_0_24px_rgba(212,175,55,0.08)]"
                    : "border-white/10"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          isVerify
                            ? "border-[#d4af37]/40 bg-[#d4af37]/15 text-[#d4af37]"
                            : "border-white/15 bg-white/[0.06] text-white"
                        }`}
                      >
                        {isVerify && <FileCheck2 className="w-3 h-3" />}
                        {inq.inquiry_type.replace(/_/g, " ")}
                      </span>
                      <span className="text-xs text-[#b0b0b0]">
                        {new Date(inq.created_at).toLocaleString()}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-white font-['Outfit'] pt-1">
                      {inq.name}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#b0b0b0]">
                      {inq.phone && (
                        <a
                          href={`tel:${inq.phone}`}
                          className="inline-flex items-center gap-1.5 text-white hover:text-[#d4af37]"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                          {inq.phone}
                        </a>
                      )}
                      {inq.email && (
                        <a
                          href={`mailto:${inq.email}`}
                          className="inline-flex items-center gap-1.5 hover:text-[#d4af37]"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                          {inq.email}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Controls: WhatsApp Customer + Status Select + Delete */}
                  <div className="flex flex-wrap items-center gap-2">
                    {inq.phone && (
                      <a
                        href={customerWhatsAppUrl(
                          inq.phone,
                          isVerify && inq.chassis
                            ? `Assalamu Alaikum ${inq.name}, this is Car Choice BD (Rajshahi) regarding your Japanese auction sheet verification request for chassis ${inq.chassis}.`
                            : `Assalamu Alaikum ${inq.name}, this is Car Choice BD (Rajshahi) regarding your inquiry${
                                inq.subject ? ` (${inq.subject})` : ""
                              }.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Reply Customer on WA
                      </a>
                    )}

                    <select
                      value={inq.status}
                      onChange={(e) =>
                        handleStatusChange(
                          inq.id,
                          e.target.value as InquiryStatus
                        )
                      }
                      aria-label="Inquiry status"
                      className={`rounded-xl px-3 py-2 text-xs font-bold border focus:outline-none ${
                        inq.status === "NEW"
                          ? "bg-[#d4af37]/15 border-[#d4af37]/45 text-[#d4af37]"
                          : inq.status === "IN_PROGRESS"
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
                      onClick={() => handleDelete(inq.id, inq.name)}
                      className="p-2 rounded-xl text-red-300/80 hover:text-red-200 hover:bg-red-500/15 border border-transparent hover:border-red-500/30 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {(inq.subject || inq.chassis) && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
                    {inq.chassis && (
                      <span className="px-3 py-1 rounded-lg bg-[#161616] border border-[#d4af37]/35 font-mono text-xs text-[#d4af37] font-bold">
                        Chassis / VIN: {inq.chassis}
                      </span>
                    )}
                    {inq.subject && (
                      <p className="text-xs font-semibold text-[#d4af37]">
                        {inq.subject}
                      </p>
                    )}
                  </div>
                )}

                <p className="text-sm text-white/85 mt-3 whitespace-pre-wrap leading-relaxed bg-[#161616] p-3.5 rounded-xl border border-white/5">
                  {inq.message}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

