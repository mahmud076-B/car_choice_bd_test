import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import HeroVideo from "@/components/HeroVideo";
import {
  HOTLINE_DISPLAY,
  HOTLINE_TEL,
  SHOWROOM_ADDRESS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Car Choice BD",
};

export default function AboutPage() {
  return (
    <div className="bg-[#050505]">
      <section className="relative min-h-[calc(100svh-68px)] sm:min-h-[88vh] flex items-center overflow-hidden text-white">
        <HeroVideo src="/about-showroom.mp4" poster="/Cover_Photo.png" />
        <div className="absolute inset-0 z-[1] bg-black/35" aria-hidden />
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/50 to-black/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-black/35"
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.32em] text-[#d4af37] mb-5 sm:mb-4 font-semibold drop-shadow-md">
            About Us
          </p>
          <h1 className="text-[1.85rem] sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.18] sm:leading-[1.08] drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
            Drive Excellence
          </h1>
          <div className="mt-5 h-px w-12 bg-[#d4af37]/80" />

          <div className="mt-7 sm:mt-8 max-w-[40ch] sm:max-w-xl space-y-5">
            <p className="text-[15px] sm:text-lg font-normal leading-[1.75] tracking-[0.01em] text-white/78 drop-shadow-md">
              At Car Choice BD, we specialize in importing high-quality Japanese
              reconditioned vehicles to Bangladesh. We are committed to
              providing our customers with reliable cars, complete with
              authentic auction sheets for transparency.
            </p>
            <p className="text-[15px] sm:text-lg font-normal leading-[1.75] tracking-[0.01em] text-white/70 drop-shadow-md">
              Our mission is a seamless, transparent buying experience with
              excellent after-sales service across Toyota, Honda, Nissan, and
              Mitsubishi.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 space-y-3 text-sm text-white/70">
            <p className="flex items-start gap-2.5 max-w-md leading-relaxed">
              <MapPin className="w-4 h-4 mt-0.5 text-[#d4af37] shrink-0" />
              {SHOWROOM_ADDRESS}
            </p>
            <p>
              <a
                href={`tel:${HOTLINE_TEL}`}
                className="inline-flex items-center gap-2.5 text-white/80 hover:text-[#d4af37]"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                {HOTLINE_DISPLAY}
              </a>
            </p>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              href="/stock"
              className="btn-primary inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] sm:text-sm"
            >
              Explore Available Cars
              <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/contact"
              className="btn-ghost inline-flex items-center justify-center px-4 py-2.5 rounded-full text-[13px] sm:text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
