"use client";

import { useState, useTransition } from "react";
import {
  Search,
  Plus,
  Copy,
  Trash2,
  Save,
  CheckCircle2,
} from "lucide-react";
import { saveDutySheetAction } from "@/app/actions/duty";
import type { DutyRow } from "@/data/dutySheet";

const field =
  "w-full bg-[#161616] border border-white/12 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]";

export default function DutySheetEditor({ initial }: { initial: DutyRow[] }) {
  const [rows, setRows] = useState(initial);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState(true);
  const [pending, start] = useTransition();

  function update(id: string, patch: Partial<DutyRow>) {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, ...patch } : row))
    );
  }

  function duplicateRow(row: DutyRow) {
    const copy: DutyRow = {
      ...row,
      id: `d-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      year: row.year - 1,
    };
    setRows((current) => {
      const idx = current.findIndex((r) => r.id === row.id);
      if (idx < 0) return [...current, copy];
      const next = [...current];
      next.splice(idx + 1, 0, copy);
      return next;
    });
  }

  const visibleRows = rows.filter((row) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      row.brand.toLowerCase().includes(q) ||
      row.model.toLowerCase().includes(q) ||
      row.chassis.toLowerCase().includes(q) ||
      String(row.year).includes(q)
    );
  });

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const result = await saveDutySheetAction(rows);
          setOk(result.ok);
          setMessage(result.message);
        });
      }}
    >
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0f0f0f] border border-white/10">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter sheet by brand, model, chassis, or year…"
            className="w-full bg-[#161616] border border-white/12 rounded-xl pl-10 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            className="btn-ghost inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs"
            onClick={() =>
              setRows((current) => [
                ...current,
                {
                  id: `d-${Date.now()}`,
                  brand: "Toyota",
                  model: "",
                  chassis: "",
                  year: new Date().getFullYear(),
                  cc: 1500,
                  dutyBdt: 0,
                },
              ])
            }
          >
            <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
            Add Row ({rows.length})
          </button>

          <button
            type="submit"
            disabled={pending}
            className="btn-primary inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs disabled:opacity-60"
          >
            <Save className="w-3.5 h-3.5" />
            {pending ? "Saving…" : "Save Duty Sheet"}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`text-xs rounded-xl px-4 py-3 border flex items-center gap-2 ${
            ok
              ? "border-[#25d366]/40 text-[#6ee7a0] bg-[#25d366]/10"
              : "border-red-500/40 text-red-300 bg-red-500/10"
          }`}
        >
          {ok && <CheckCircle2 className="w-4 h-4 shrink-0" />}
          {message}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0f0f0f]">
        <table className="w-full min-w-[860px] text-sm">
          <thead className="bg-white/[0.03] border-b border-white/10 text-left text-[11px] uppercase tracking-wider text-[#d4af37]">
            <tr>
              {[
                "Brand",
                "Model",
                "Chassis Code",
                "Year",
                "Engine CC",
                "Duty Amount (BDT)",
                "Formatted Preview",
                "Actions",
              ].map((label) => (
                <th key={label} className="px-3.5 py-3.5 font-bold">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {visibleRows.map((row) => (
              <tr key={row.id} className="hover:bg-white/[0.02]">
                <td className="p-2.5">
                  <input
                    className={field}
                    value={row.brand}
                    placeholder="Toyota"
                    onChange={(event) =>
                      update(row.id, { brand: event.target.value })
                    }
                  />
                </td>
                <td className="p-2.5">
                  <input
                    className={field}
                    value={row.model}
                    placeholder="Harrier"
                    onChange={(event) =>
                      update(row.id, { model: event.target.value })
                    }
                  />
                </td>
                <td className="p-2.5">
                  <input
                    className={`${field} font-mono`}
                    value={row.chassis}
                    placeholder="AXUH80"
                    onChange={(event) =>
                      update(row.id, {
                        chassis: event.target.value.toUpperCase(),
                      })
                    }
                  />
                </td>
                <td className="p-2.5 w-28">
                  <input
                    className={field}
                    inputMode="numeric"
                    value={row.year}
                    onChange={(event) =>
                      update(row.id, { year: Number(event.target.value) })
                    }
                  />
                </td>
                <td className="p-2.5 w-28">
                  <input
                    className={field}
                    inputMode="numeric"
                    value={row.cc}
                    onChange={(event) =>
                      update(row.id, { cc: Number(event.target.value) })
                    }
                  />
                </td>
                <td className="p-2.5 w-40">
                  <input
                    className={`${field} font-mono`}
                    inputMode="numeric"
                    value={row.dutyBdt}
                    onChange={(event) =>
                      update(row.id, { dutyBdt: Number(event.target.value) })
                    }
                  />
                </td>
                <td className="px-3.5 py-2.5 font-mono text-xs font-bold text-[#d4af37] whitespace-nowrap">
                  ৳ {Number(row.dutyBdt || 0).toLocaleString("en-IN")}
                </td>
                <td className="p-2.5 text-right whitespace-nowrap space-x-1">
                  <button
                    type="button"
                    onClick={() => duplicateRow(row)}
                    className="p-2 rounded-lg text-xs text-[#b0b0b0] hover:text-[#d4af37] hover:bg-white/[0.05]"
                    title="Duplicate row for another year/CC"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-lg text-xs text-red-300/80 hover:text-red-200 hover:bg-red-500/15"
                    title="Remove row"
                    onClick={() =>
                      setRows((current) =>
                        current.filter((item) => item.id !== row.id)
                      )
                    }
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
}
