import { listInquiriesLocal } from "@/lib/leads";
import InquiriesManager from "@/components/admin/InquiriesManager";

export default async function AdminInquiriesPage() {
  const inquiries = await listInquiriesLocal();

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-white/10">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#d4af37] font-semibold">
          Customer Lead Inbox
        </p>
        <h1 className="text-3xl font-bold text-white font-['Outfit'] mt-1">
          Inquiries & Auction Sheet Checks
        </h1>
        <p className="text-sm text-[#b0b0b0] mt-1">
          Reply directly to customers on WhatsApp, verify Japanese chassis
          numbers, and update lead statuses.
        </p>
      </div>

      <InquiriesManager initialInquiries={inquiries} />
    </div>
  );
}
