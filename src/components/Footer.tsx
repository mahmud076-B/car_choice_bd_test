import Link from "next/link";
import {
  FACEBOOK_PAGE_URL,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_URL,
  HOTLINE_DISPLAY,
  SECONDARY_HOTLINE_DISPLAY,
  SHOWROOM_ADDRESS,
} from "@/lib/constants";
import { generalInquiryUrl } from "@/lib/whatsapp";

const usefulLinks = [
  { label: "How to Buy", href: "/how-to-buy" },
  { label: "Verify Auction Sheet", href: "/verify-auction-sheet" },
  { label: "Duty Calculator", href: "/car-duty" },
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
            <span className="font-extrabold text-lg text-white tracking-tight leading-none">
              CAR <span className="text-[#d4af37]">CHOICE</span> BD
            </span>
          </Link>
          <p className="text-sm text-[#b0b0b0] leading-relaxed">
            Every car has a story — start yours with CAR Choice BD! From
            reliable daily rides to luxury dreams, we bring you inspected,
            road-ready Japanese reconditioned vehicles in Rajshahi, Bangladesh.
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
          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs">
            <a
              href={GOOGLE_MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4af37] hover:underline font-semibold"
            >
              Get Directions on Google Maps ↗
            </a>
            <span className="text-white/25">·</span>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#d4af37] hover:underline font-medium"
            >
              View Location Pin
            </a>
          </div>
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
            <span className="text-white/30 mx-1.5">·</span>
            <a
              href="https://wa.me/8801847475544"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#6ee7a0] hover:text-[#d4af37] transition-colors"
            >
              {SECONDARY_HOTLINE_DISPLAY}
            </a>
          </p>
          <p className="mt-4 text-xs text-white/35 tracking-wide">
            We Accept Bank Pay Order · Cheque · bKash
          </p>
          <p className="mt-3 text-sm">
            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-[#d4af37] hover:underline"
            >
              Follow us on Facebook →
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/30 tracking-widest uppercase">
        © {new Date().getFullYear()} CAR CHOICE BD. ALL RIGHTS RESERVED.{" "}
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
