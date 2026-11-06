"use client";

import { useState, useTransition } from "react";
import { saveDutySheetAction } from "@/app/actions/duty";
import type { DutyRow } from "@/data/dutySheet";

const field =
  "w-full bg-[#141E33] border border-white/10 rounded-lg px-2.5 py-2 text-sm text-white";

export default function DutySheetEditor({ initial }: { initial: DutyRow[] }) {
  const [rows, setRows] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState(true);
  const [pending, start] = useTransition();

  function update(id: string, patch: Partial<DutyRow>) {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, ...patch } : row))
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const result = await saveDutySheetAction(rows);
          setOk(result.ok);
          setMessage(result.message);
        });
      }}
    >
      {message && (
        <p className={`text-sm ${ok ? "text-green-300" : "text-red-300"}`}>
          {message}
        </p>
      )}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-white/[0.04] text-left text-xs uppercase tracking-wider text-[#D4AF37]">
            <tr>
              {["Brand", "Model", "Chassis", "Year", "CC", "Duty (BDT)", ""].map(
                (label) => (
                  <th key={label} className="px-3 py-3 font-semibold">
                    {label}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-white/10">
                <td className="p-2">
                  <input
                    className={field}
                    value={row.brand}
                    onChange={(event) => update(row.id, { brand: event.target.value })}
                  />
                </td>
                <td className="p-2">
                  <input
                    className={field}
                    value={row.model}
                    onChange={(event) => update(row.id, { model: event.target.value })}
                  />
                </td>
                <td className="p-2">
                  <input
                    className={field}
                    value={row.chassis}
                    onChange={(event) =>
                      update(row.id, { chassis: event.target.value.toUpperCase() })
                    }
                  />
                </td>
                <td className="p-2">
                  <input
                    className={field}
                    inputMode="numeric"
                    value={row.year}
                    onChange={(event) =>
                      update(row.id, { year: Number(event.target.value) })
                    }
                  />
                </td>
                <td className="p-2">
                  <input
                    className={field}
                    inputMode="numeric"
                    value={row.cc}
                    onChange={(event) =>
                      update(row.id, { cc: Number(event.target.value) })
                    }
                  />
                </td>
                <td className="p-2">
                  <input
                    className={field}
                    inputMode="numeric"
                    value={row.dutyBdt}
                    onChange={(event) =>
                      update(row.id, { dutyBdt: Number(event.target.value) })
                    }
                  />
                </td>
                <td className="p-2">
                  <button
                    type="button"
                    className="text-xs text-red-300 hover:text-red-200"
                    onClick={() =>
                      setRows((current) => current.filter((item) => item.id !== row.id))
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="px-4 py-2 rounded-lg border border-white/15 text-sm"
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
          Add row
        </button>
        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#0b1426] text-sm font-bold disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save duty sheet"}
        </button>
      </div>
    </form>
  );
}
