import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Car Choice BD",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-['Outfit'] text-white">
        Privacy Policy
      </h1>
      <div className="w-12 h-1 bg-[#d4af37] mt-3 mb-6" />
      <div className="bg-[#0f0f0f]/80 border border-white/10 rounded-xl p-6 text-sm text-[#b0b0b0] leading-relaxed space-y-3">
        <p>
          Car Choice BD collects inquiry details (name, phone, email, chassis
          numbers, and messages) solely to respond to vehicle and auction-sheet
          requests. We do not sell personal data.
        </p>
        <p>
          WhatsApp conversations occur on Meta&apos;s platform under their
          terms. Customer delivery photos are published only with consent.
        </p>
        <p>
          Contact{" "}
          <a href="mailto:info@carchoicebd.com" className="text-[#d4af37]">
            info@carchoicebd.com
          </a>{" "}
          for data requests.
        </p>
      </div>
    </div>
  );
}
