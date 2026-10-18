"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, Table2 } from "lucide-react";
import { useTransition } from "react";

export default function ViewToggle({ active }: { active: "card" | "table" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const setView = (view: "card" | "table") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    startTransition(() => {
      router.push(`/stock?${params.toString()}`);
    });
  };

  return (
    <div className="inline-flex rounded-md border border-white/10 bg-[#0f0f0f]/80 p-0.5">
      <button
        type="button"
        onClick={() => setView("card")}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold ${
          active === "card"
            ? "bg-[#d4af37] text-[#0b1426]"
            : "text-[#b0b0b0] hover:text-white"
        }`}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        Cards
      </button>
      <button
        type="button"
        onClick={() => setView("table")}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold ${
          active === "table"
            ? "bg-[#d4af37] text-[#0b1426]"
            : "text-[#b0b0b0] hover:text-white"
        }`}
      >
        <Table2 className="w-3.5 h-3.5" />
        Table
      </button>
    </div>
  );
}
