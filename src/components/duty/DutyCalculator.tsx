"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { lookupDuty, type DutyRow } from "@/data/dutySheet";

function unique(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function taka(amount: number) {
  return `৳ ${amount.toLocaleString("en-IN")}`;
}

type FieldProps = {
  step: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  disabled: boolean;
  open: boolean;
  onToggle: () => void;
  onPick: (value: string) => void;
};

function DutyField({
  step,
  label,
  value,
  placeholder,
  options,
  disabled,
  open,
  onToggle,
  onPick,
}: FieldProps) {
  const listId = useId();

  return (
    <div
      className={`relative transition-opacity duration-300 ${
        disabled ? "opacity-45" : "opacity-100"
      } ${open ? "z-30" : "z-10"}`}
    >
      <p className="mb-1.5 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/45">
        <span className="text-[#d4af37]">{step}</span>
        {label}
      </p>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-all duration-300 ${
          open
            ? "border-[#d4af37]/70 bg-[#d4af37]/10 shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
            : value
              ? "border-[#d4af37]/35 bg-white/[0.05]"
              : "border-white/10 bg-[#0b1426]"
        } disabled:cursor-not-allowed`}
      >
        <span className={value ? "font-semibold text-white" : "text-white/35"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#d4af37] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`absolute left-0 right-0 top-[calc(100%+6px)] origin-top overflow-hidden rounded-xl border border-white/10 bg-[#0b1426]/95 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        <ul
          id={listId}
          role="listbox"
          className="max-h-56 overflow-y-auto p-1.5"
        >
          {options.map((option, index) => {
            const selected = option === value;
            return (
              <li
                key={option}
                style={{ transitionDelay: open ? `${index * 28}ms` : "0ms" }}
                className={`transition-all duration-300 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => onPick(option)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                    selected
                      ? "bg-[#d4af37] text-[#0b1426]"
                      : "text-white/85 hover:bg-white/[0.06]"
                  }`}
                >
                  {option}
                  {selected && <Check className="h-4 w-4" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function DutyCalculator({ rows }: { rows: DutyRow[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [chassis, setChassis] = useState("");
  const [year, setYear] = useState("");
  const [cc, setCc] = useState("");

  const brands = useMemo(() => unique(rows.map((row) => row.brand)), [rows]);
  const models = useMemo(
    () => unique(rows.filter((row) => row.brand === brand).map((row) => row.model)),
    [rows, brand]
  );
  const chassisCodes = useMemo(
    () =>
      unique(
        rows
          .filter((row) => row.brand === brand && row.model === model)
          .map((row) => row.chassis)
      ),
    [rows, brand, model]
  );
  const years = useMemo(
    () =>
      unique(
        rows
          .filter(
            (row) =>
              row.brand === brand &&
              row.model === model &&
              row.chassis === chassis
          )
          .map((row) => String(row.year))
      ).sort((a, b) => Number(b) - Number(a)),
    [rows, brand, model, chassis]
  );
  const ccs = useMemo(
    () =>
      unique(
        rows
          .filter(
            (row) =>
              row.brand === brand &&
              row.model === model &&
              row.chassis === chassis &&
              String(row.year) === year
          )
          .map((row) => String(row.cc))
      ).sort((a, b) => Number(a) - Number(b)),
    [rows, brand, model, chassis, year]
  );

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(null);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const match = lookupDuty(rows, { brand, model, chassis, year, cc });
  const ready = Boolean(brand && model && chassis && year && cc);

  const fields: FieldProps[] = [
    {
      step: "01",
      label: "Select car brand",
      value: brand,
      placeholder: "Brand",
      options: brands,
      disabled: false,
      open: open === "brand",
      onToggle: () => setOpen(open === "brand" ? null : "brand"),
      onPick: (value) => {
        setBrand(value);
        setModel("");
        setChassis("");
        setYear("");
        setCc("");
        setOpen("model");
      },
    },
    {
      step: "02",
      label: "Select model",
      value: model,
      placeholder: "Model",
      options: models,
      disabled: !brand,
      open: open === "model",
      onToggle: () => setOpen(open === "model" ? null : "model"),
      onPick: (value) => {
        setModel(value);
        setChassis("");
        setYear("");
        setCc("");
        setOpen("chassis");
      },
    },
    {
      step: "03",
      label: "Select chassis code",
      value: chassis,
      placeholder: "Chassis code",
      options: chassisCodes,
      disabled: !model,
      open: open === "chassis",
      onToggle: () => setOpen(open === "chassis" ? null : "chassis"),
      onPick: (value) => {
        setChassis(value);
        setYear("");
        setCc("");
        setOpen("year");
      },
    },
    {
      step: "04",
      label: "Select year",
      value: year,
      placeholder: "Year",
      options: years,
      disabled: !chassis,
      open: open === "year",
      onToggle: () => setOpen(open === "year" ? null : "year"),
      onPick: (value) => {
        setYear(value);
        setCc("");
        setOpen("cc");
      },
    },
    {
      step: "05",
      label: "Select CC",
      value: cc,
      placeholder: "CC",
      options: ccs,
      disabled: !year,
      open: open === "cc",
      onToggle: () => setOpen(open === "cc" ? null : "cc"),
      onPick: (value) => {
        setCc(value);
        setOpen(null);
      },
    },
  ];

  return (
    <div
      ref={rootRef}
      className="rounded-2xl border border-white/10 bg-[#0b1426]/75 p-5 sm:p-8 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.step}
            className={field.step === "05" ? "sm:col-span-2" : undefined}
          >
            <DutyField {...field} />
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-5 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
          Car duty is
        </p>
        <p
          key={match ? match.id : ready ? "missing" : "empty"}
          className="duty-amount mt-2 text-3xl font-extrabold text-white sm:text-4xl"
        >
          {match ? taka(match.dutyBdt) : ready ? "Not on the sheet" : "—"}
        </p>
      </div>
    </div>
  );
}
