import type { Metadata } from "next";
import Link from "next/link";
import StaggerReveal from "@/components/StaggerReveal";

export const metadata: Metadata = {
  title: "How to Buy | Car Choice BD",
};

const readySteps = [
  {
    title: "Browse live stock",
    body: "Filter inventory by make, year, grade, mileage, and fuel on our Stock List.",
  },
  {
    title: "Confirm on WhatsApp",
    body: "Ask availability and pricing. We share auction sheet details transparently.",
  },
  {
    title: "Visit the showroom",
    body: "Inspect the car near BRTA Office, Amchattar, Rajshahi.",
  },
  {
    title: "Payment & registration",
    body: "Complete payment as agreed. We assist with BRTA registration guidance.",
  },
  {
    title: "Handover",
    body: "Collect your keys after final checks. Drive Excellence.",
  },
];

const preOrderSteps = [
  {
    title: "Submit a pre-order request",
    body: "Share make, model, year range, and budget on our Pre-Order form or WhatsApp.",
  },
  {
    title: "Sourcing confirmation",
    body: "We find matching Japanese auction units and confirm grades with you.",
  },
  {
    title: "Booking agreement",
    body: "Agree deposit and service terms with Car Choice BD sales staff.",
  },
  {
    title: "Import & delivery",
    body: "After purchase in Japan, the vehicle ships and is prepared for handover.",
  },
];

export default function HowToBuyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-white">
        How to Buy
      </h1>
      <div className="w-12 h-1 bg-[#d4af37] mt-3 mb-4" />
      <p className="text-sm text-[#b0b0b0] mb-10">
        Two clear paths: ready / port stock, or pre-order from Japan auctions.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white font-['Outfit'] mb-4">
          Vehicle from Stock
        </h2>
        <StaggerReveal className="space-y-3">
          {readySteps.map((step, i) => (
            <div
              key={step.title}
              className="p-4 rounded-xl bg-[#0f0f0f]/80 border border-white/10 flex gap-4"
            >
              <span className="text-[#d4af37] font-mono font-bold">
                STEP {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-[#b0b0b0] mt-1">{step.body}</p>
              </div>
            </div>
          ))}
        </StaggerReveal>
        <Link
          href="/stock"
          className="inline-block mt-4 text-sm font-bold text-[#d4af37] hover:underline"
        >
          Check Live Stock →
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white font-['Outfit'] mb-4">
          Vehicle from Auction / Pre-Order
        </h2>
        <StaggerReveal className="space-y-3" staggerMs={80}>
          {preOrderSteps.map((step, i) => (
            <div
              key={step.title}
              className="p-4 rounded-xl bg-[#0f0f0f]/80 border border-white/10 flex gap-4"
            >
              <span className="text-[#d4af37] font-mono font-bold">
                STEP {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-[#b0b0b0] mt-1">{step.body}</p>
              </div>
            </div>
          ))}
        </StaggerReveal>
        <Link
          href="/pre-order"
          className="inline-block mt-4 text-sm font-bold text-[#d4af37] hover:underline"
        >
          Start Pre-Order →
        </Link>
      </section>
    </div>
  );
}
