import type { Metadata } from "next";
import { MapPin, Phone, MessageSquare, Mail } from "lucide-react";
import HeroVideo from "@/components/HeroVideo";
import { ContactForm } from "@/components/forms/LeadFormFields";
import { submitContact } from "@/app/actions/leads";
import { generalInquiryUrl } from "@/lib/whatsapp";
import {
  HOTLINE_DISPLAY,
  HOTLINE_TEL,
  SHOWROOM_ADDRESS,
} from "@/lib/constants";
import StaggerReveal from "@/components/StaggerReveal";

export const metadata: Metadata = {
  title: "Contact | Car Choice BD",
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-[#050505]">
      <HeroVideo src="/contact-showroom.mp4" />
      <div className="absolute inset-0 z-[1] bg-black/45" aria-hidden />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/75 via-black/40 to-black/80"
        aria-hidden
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <span className="gold-badge mb-4">Get in Touch</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3">
          Contact
        </h1>
        <div className="section-rule" />
      </div>

      <StaggerReveal className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div className="glass-card p-6 space-y-4">
            <h2 className="font-bold text-white">Office Address</h2>
            <p className="text-sm text-[#b0b0b0] flex gap-2">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              Showroom Address: {SHOWROOM_ADDRESS}
            </p>
            <p className="text-sm text-[#b0b0b0]">Working Hour: 10 am – 8 pm</p>
          </div>
          <div className="glass-card p-6 space-y-3">
            <h2 className="font-bold text-white">Make A Call Now</h2>
            <a
              href={`tel:${HOTLINE_TEL}`}
              className="text-sm flex gap-2 text-white hover:text-[#d4af37]"
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              {HOTLINE_DISPLAY}
            </a>
            <a
              href={generalInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm flex gap-2 text-[#6ee7a0] font-semibold"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Direct
            </a>
            <p className="text-sm flex gap-2 text-[#b0b0b0]">
              <Mail className="w-4 h-4 text-[#d4af37]" />
              info@carchoicebd.com
            </p>
          </div>
        </div>
        <div className="glass-panel p-6 md:p-8">
          <h2 className="font-bold text-white mb-4">Just Say Hello!</h2>
          <ContactForm action={submitContact} />
        </div>
      </StaggerReveal>
      </div>
    </div>
  );
}
