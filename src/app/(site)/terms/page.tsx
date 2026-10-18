import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Car Choice BD",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-['Outfit'] text-white">
        Terms & Conditions
      </h1>
      <div className="w-12 h-1 bg-[#d4af37] mt-3 mb-6" />
      <div className="bg-[#0f0f0f]/80 border border-white/10 rounded-xl p-6 text-sm text-[#b0b0b0] leading-relaxed space-y-3">
        <p>
          Website content and vehicle listings on carchoicebd.com are provided
          for information. Prices, availability, and specifications may change
          without notice until a written booking is confirmed.
        </p>
        <p>
          Auction grades and mileage are based on Japanese auction documentation
          as presented; buyers should verify sheets during purchase. Deposit and
          import fee schedules are confirmed directly with Car Choice BD sales
          staff.
        </p>
      </div>
    </div>
  );
}
