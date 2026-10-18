import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck2, MessageSquare } from "lucide-react";
import { VerifyForm } from "@/components/forms/LeadFormFields";
import { submitVerify } from "@/app/actions/leads";
import { verifyInquiryUrl } from "@/lib/whatsapp";
import StaggerReveal from "@/components/StaggerReveal";

export const metadata: Metadata = {
  title: "Verify Auction Sheet | Car Choice BD",
  description:
    "Request Japanese auction sheet verification by chassis number via Car Choice BD.",
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function VerifyPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const chassisRaw = sp.chassis;
  const initialChassis = Array.isArray(chassisRaw)
    ? chassisRaw[0]
    : chassisRaw;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex w-14 h-14 rounded-full bg-[#d4af37]/10 text-[#d4af37] items-center justify-center mb-4">
          <FileCheck2 className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-white">
          Instant Auction Sheet Verification
        </h1>
        <p className="text-[#b0b0b0] mt-3 max-w-2xl mx-auto text-sm">
          Enter the chassis number / VIN to request the original Japanese
          auction sheet through Car Choice BD. Free lead service — our team
          follows up on WhatsApp.
        </p>
        <p className="text-sm text-[#b0b0b0] mt-2">
          গাড়ির চ্যাসিস নাম্বার দিয়ে অকশন শিট যাচাইয়ের অনুরোধ পাঠান।
        </p>
      </div>

      <StaggerReveal className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3 p-6 rounded-xl bg-[#0f0f0f]/80 border border-white/10 shadow-sm">
          <VerifyForm action={submitVerify} initialChassis={initialChassis} />
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="p-5 rounded-xl bg-[#0f0f0f]/80 border border-white/10 text-sm text-[#b0b0b0] space-y-2">
            <p className="font-bold text-white">What you get</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Staff review of the chassis</li>
              <li>WhatsApp follow-up with next steps</li>
              <li>Guidance reading grades & mileage</li>
            </ul>
          </div>
          {initialChassis && (
            <a
              href={verifyInquiryUrl(initialChassis)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-md text-sm font-bold btn-whatsapp"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp this chassis
            </a>
          )}
          <Link
            href="/how-to-buy"
            className="block text-center text-sm text-[#d4af37] font-semibold hover:underline"
          >
            How to buy guide →
          </Link>
        </div>
      </StaggerReveal>
    </div>
  );
}
