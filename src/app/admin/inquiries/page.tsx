import { listInquiriesLocal } from "@/lib/leads";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default async function AdminInquiriesPage() {
  const inquiries = await listInquiriesLocal();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white font-['Outfit'] mb-6">
        Inquiries
      </h1>
      {inquiries.length === 0 ? (
        <p className="text-sm text-slate-400">
          No inquiries yet. Submit the contact or verify forms on the public
          site.
        </p>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <article
              key={inq.id}
              className="p-4 rounded-2xl border border-white/10 bg-[#0B111E]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-white font-semibold">{inq.name}</p>
                  <p className="text-xs text-slate-500">
                    {inq.inquiry_type} · {inq.status} ·{" "}
                    {new Date(inq.created_at).toLocaleString()}
                  </p>
                </div>
                {inq.phone && (
                  <a
                    href={buildWhatsAppUrl(
                      `Hello ${inq.name}, regarding your ${inq.inquiry_type} inquiry.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#25D366]"
                  >
                    Quick Reply via WhatsApp
                  </a>
                )}
              </div>
              {inq.subject && (
                <p className="text-sm text-[#D4AF37] mt-2">{inq.subject}</p>
              )}
              {inq.chassis && (
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Chassis: {inq.chassis}
                </p>
              )}
              <p className="text-sm text-slate-300 mt-2 whitespace-pre-wrap">
                {inq.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
