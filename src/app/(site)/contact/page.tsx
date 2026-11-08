import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  ExternalLink,
  Navigation,
  Clock,
} from "lucide-react";
import HeroVideo from "@/components/HeroVideo";
import ShowroomMap from "@/components/ShowroomMap";
import { ContactForm } from "@/components/forms/LeadFormFields";
import { submitContact } from "@/app/actions/leads";
import { generalInquiryUrl } from "@/lib/whatsapp";
import {
  FACEBOOK_PAGE_URL,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_URL,
  HOTLINE_DISPLAY,
  HOTLINE_TEL,
  SECONDARY_HOTLINE_DISPLAY,
  SECONDARY_HOTLINE_TEL,
  SHOWROOM_ADDRESS,
} from "@/lib/constants";
import StaggerReveal from "@/components/StaggerReveal";

export const metadata: Metadata = {
  title: "Contact & Showroom Location | Car Choice BD",
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-[#050505]">
      <HeroVideo src="/contact-showroom.mp4" />
      <div className="absolute inset-0 z-[1] bg-black/45" aria-hidden />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/75 via-black/40 to-black/90"
        aria-hidden
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center">
          <span className="gold-badge mb-4">Get in Touch</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Contact CAR CHOICE BD
          </h1>
          <p className="text-sm text-[#b0b0b0] mt-2 max-w-2xl mx-auto">
            Visit our Rajshahi flagship showroom near the BRTA Office, call our
            sales team directly, or send us your inquiry below.
          </p>
          <div className="section-rule" />
        </div>

        <StaggerReveal className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-bold text-white text-lg">
                  Rajshahi Showroom Address
                </h2>
                <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold">
                  Main Location
                </span>
              </div>

              <p className="text-sm text-[#b0b0b0] flex gap-2.5 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-1" />
                <span>{SHOWROOM_ADDRESS}</span>
              </p>

              <p className="text-sm text-[#b0b0b0] flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Working Hours: 10:00 AM – 8:00 PM (Open Everyday)</span>
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-4 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Get Directions on Google Maps
                </a>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-4 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  Open Showroom Pin
                  <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                </a>
              </div>
            </div>

            <div className="glass-card p-6 space-y-3">
              <h2 className="font-bold text-white text-lg">
                Call or WhatsApp Direct
              </h2>
              <a
                href={`tel:${HOTLINE_TEL}`}
                className="text-sm flex items-center gap-2.5 text-white hover:text-[#d4af37] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>
                  <strong className="font-semibold">{HOTLINE_DISPLAY}</strong>{" "}
                  <span className="text-xs text-[#b0b0b0]">
                    (Primary Sales Hotline)
                  </span>
                </span>
              </a>
              <a
                href={`tel:${SECONDARY_HOTLINE_TEL}`}
                className="text-sm flex items-center gap-2.5 text-white hover:text-[#d4af37] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>
                  <strong className="font-semibold">
                    {SECONDARY_HOTLINE_DISPLAY}
                  </strong>{" "}
                  <span className="text-xs text-[#b0b0b0]">
                    (Pre-Order & Import Desk)
                  </span>
                </span>
              </a>
              <a
                href={generalInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-2.5 text-[#6ee7a0] font-semibold hover:text-[#d4af37] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Direct ({HOTLINE_DISPLAY})
              </a>
              <a
                href="mailto:info@carchoicebd.com"
                className="text-sm flex items-center gap-2.5 text-[#b0b0b0] hover:text-[#d4af37] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#d4af37]" />
                info@carchoicebd.com
              </a>
              <div className="pt-2">
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] hover:underline"
                >
                  Visit Official Facebook Page (CAR Choice BD)
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 md:p-8">
            <h2 className="font-bold text-white text-lg mb-4">
              Send Us a Message
            </h2>
            <ContactForm action={submitContact} />
          </div>
        </StaggerReveal>

        {/* Full-Width Interactive Google Maps Section */}
        <section aria-label="Showroom Google Map" className="pt-2">
          <div className="mb-5 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#d4af37] font-semibold">
                Find Us in Rajshahi
              </p>
              <h2 className="text-2xl font-bold text-white mt-1">
                Showroom Location & Live Directions
              </h2>
            </div>
            <p className="text-xs text-[#b0b0b0]">
              Click <strong className="text-white">Get Directions</strong> for
              turn-by-turn navigation from your current location.
            </p>
          </div>
          <ShowroomMap heightClass="h-[380px] sm:h-[460px]" />
        </section>
      </div>
    </div>
  );
}
