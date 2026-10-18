import type { Metadata } from "next";
import { Globe2, MessageSquare, Phone } from "lucide-react";
import { PreOrderForm } from "@/components/forms/LeadFormFields";
import { submitPreOrder } from "@/app/actions/leads";
import { generalInquiryUrl } from "@/lib/whatsapp";
import { HOTLINE_DISPLAY, HOTLINE_TEL } from "@/lib/constants";
import StaggerReveal from "@/components/StaggerReveal";

export const metadata: Metadata = {
  title: "Pre-Order from Japan | Car Choice BD",
};

export default function PreOrderPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-white">
        Pre-Order Your Ideal Car
      </h1>
      <div className="w-12 h-1 bg-[#d4af37] mt-3 mb-4" />
      <p className="text-sm text-[#b0b0b0] max-w-2xl mb-8">
        Tell us the make, model, year range, and budget. Car Choice BD will
        source matching Japanese auction units and confirm on WhatsApp.
      </p>

      <StaggerReveal className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 p-6 rounded-xl bg-[#0f0f0f]/80 border border-white/10 shadow-sm">
          <div className="flex items-center gap-2 text-[#d4af37] mb-4">
            <Globe2 className="w-5 h-5" />
            <h2 className="font-bold text-white font-['Outfit']">
              Sourcing request form
            </h2>
          </div>
          <PreOrderForm action={submitPreOrder} />
        </div>
        <div className="lg:col-span-2 space-y-3">
          <div className="p-5 rounded-xl bg-[#0f0f0f]/80 border border-white/10 text-sm text-[#b0b0b0]">
            <p className="font-bold text-white mb-2">Typical flow</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Submit preferences</li>
              <li>Sales confirms feasible units</li>
              <li>Booking terms agreed</li>
              <li>Auction → shipping → delivery</li>
            </ol>
          </div>
          <a
            href={generalInquiryUrl(
              "Hello Car Choice BD, I want to pre-order a Japanese car."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-md text-sm font-bold btn-whatsapp"
          >
            <MessageSquare className="w-4 h-4" />
            Discuss on WhatsApp
          </a>
          <a
            href={`tel:${HOTLINE_TEL}`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-md text-sm font-semibold border border-white/10 bg-[#0f0f0f]/80"
          >
            <Phone className="w-4 h-4 text-[#d4af37]" />
            Call {HOTLINE_DISPLAY}
          </a>
        </div>
      </StaggerReveal>
    </div>
  );
}
