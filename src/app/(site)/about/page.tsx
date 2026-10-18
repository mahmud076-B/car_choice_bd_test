import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { HOTLINE_DISPLAY, SHOWROOM_ADDRESS } from "@/lib/constants";
import StaggerReveal from "@/components/StaggerReveal";

export const metadata: Metadata = {
  title: "About Us | Car Choice BD",
};

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="hero-bg opacity-40" aria-hidden />
      <div className="glow-orb opacity-60" aria-hidden />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-14">
        <div className="text-xs text-white/45 mb-4">
          <Link href="/" className="hover:text-[#d4af37]">
            Home
          </Link>{" "}
          / <span className="text-[#d4af37]">About Us</span>
        </div>

        <StaggerReveal>
        <div className="glass-panel px-6 md:px-12 py-10 text-center">
          <div className="logo-video-wrap mx-auto mb-8 inline-block">
            <div className="logo-video-inner">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="logo-video w-48 md:w-56"
              >
                <source src="/Animated_Logo.mp4" type="video/mp4" />
                <source src="/logo-animation.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <span className="gold-badge mb-5">About Us</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Drive Excellence
          </h1>
          <p className="text-[#b0b0b0] text-sm md:text-base leading-relaxed max-w-md mx-auto mb-6">
            At Car Choice BD, we specialize in importing high-quality Japanese
            reconditioned vehicles to Bangladesh. We are committed to providing
            our customers with reliable cars, complete with authentic auction
            sheets for transparency.
          </p>
          <p className="text-[#b0b0b0] text-sm leading-relaxed max-w-md mx-auto mb-8">
            Our mission is a seamless, transparent buying experience with
            excellent after-sales service across Toyota, Honda, Nissan, and
            Mitsubishi.
          </p>
          <div className="divider-fade mx-auto mb-8" />
          <div className="space-y-3 text-sm text-[#b0b0b0]">
            <p className="flex gap-2 justify-center">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
              {SHOWROOM_ADDRESS}
            </p>
            <p className="flex gap-2 justify-center">
              <Phone className="w-4 h-4 text-[#d4af37]" />
              {HOTLINE_DISPLAY}
            </p>
          </div>
        </div>
        </StaggerReveal>
      </div>
    </div>
  );
}
