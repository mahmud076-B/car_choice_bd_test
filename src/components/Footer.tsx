import Link from "next/link";
import { HOTLINE_DISPLAY, SHOWROOM_ADDRESS } from "@/lib/constants";
import { generalInquiryUrl } from "@/lib/whatsapp";

const usefulLinks = [
  { label: "How to Buy", href: "/how-to-buy" },
  { label: "Verify Auction Sheet", href: "/verify-auction-sheet" },
  { label: "Pre-Order Japan", href: "/pre-order" },
  { label: "Delivered Cars", href: "/delivered-cars" },
  { label: "Live Stock", href: "/stock" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-4">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt=""
                aria-hidden
                className="h-[160%] w-[160%] max-w-none object-contain brightness-0 invert"
              />
            </span>
            <span className="relative font-extrabold text-lg text-white tracking-tight leading-none">
              CAR{" "}
              <span className="text-[#d4af37]">
                CHOIC
                <span className="relative inline-block">
                  E
                  <span className="absolute -top-[0.55em] left-full ml-0.5 rounded-[2px] bg-[#d4af37] px-[3px] py-[1px] text-[8px] font-bold leading-none tracking-wide text-[#0b1426]">
                    BD
                  </span>
                </span>
              </span>
            </span>
          </Link>
          <p className="text-sm text-[#b0b0b0] leading-relaxed">
            Your trusted destination for Japanese reconditioned vehicles in
            Rajshahi, Bangladesh. Certified quality, authentic auction grades,
            and direct import from Japan.
          </p>
          <p className="mt-4 text-sm">
            <span className="text-white/40">Have any question?</span>
            <br />
            <a
              href="mailto:info@carchoicebd.com"
              className="font-semibold text-white hover:text-[#d4af37]"
            >
              info@carchoicebd.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Useful Links</h2>
          <ul className="space-y-2 text-sm text-[#b0b0b0]">
            {usefulLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#d4af37]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-white">
            Contact Information
          </h2>
          <p className="text-sm text-[#b0b0b0] leading-relaxed">
            {SHOWROOM_ADDRESS}
          </p>
          <p className="mt-3 text-sm">
            <span className="text-white/40">Sales Hotline / WhatsApp:</span>
            <br />
            <a
              href={generalInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#6ee7a0] hover:text-[#d4af37] transition-colors"
            >
              {HOTLINE_DISPLAY}
            </a>
          </p>
          <p className="mt-4 text-xs text-white/35 tracking-wide">
            We Accept Bank Pay Order · Cheque · bKash
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/30 tracking-widest uppercase">
        © {new Date().getFullYear()} CARCHOICE. ALL RIGHTS RESERVED.{" "}
        <Link href="/privacy" className="hover:text-white/60 underline-offset-2">
          Privacy
        </Link>{" "}
        ·{" "}
        <Link href="/terms" className="hover:text-white/60 underline-offset-2">
          Terms
        </Link>
      </div>
    </footer>
  );
}
