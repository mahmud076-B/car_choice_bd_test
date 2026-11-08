import Link from "next/link";
import { ArrowLeft, Car, MessageSquare } from "lucide-react";
import { generalInquiryUrl } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full rounded-2xl bg-[#0f0f0f] border border-white/10 p-8 sm:p-10 text-center shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/35 text-[#d4af37] mb-5">
          <Car className="w-7 h-7" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#d4af37] font-semibold">
          404 · Page Not Found
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white mt-2">
          This Vehicle or Page Has Moved
        </h1>
        <p className="text-sm text-[#b0b0b0] mt-3 leading-relaxed">
          The listing or link you followed may have been sold, updated, or
          removed from our active showroom stock. Explore our current live
          inventory or message our team directly on WhatsApp.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/stock"
            className="btn-primary w-full sm:w-auto px-6 py-3 rounded-full text-sm inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Live Stock
          </Link>
          <a
            href={generalInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full sm:w-auto px-6 py-3 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Ask on WhatsApp
          </a>
        </div>

        <div className="mt-6 pt-5 border-t border-white/10">
          <Link
            href="/"
            className="text-xs text-[#b0b0b0] hover:text-[#d4af37] transition-colors"
          >
            Return to CAR <span className="text-[#d4af37]">CHOICE</span> BD
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

