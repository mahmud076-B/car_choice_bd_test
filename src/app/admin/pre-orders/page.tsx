import { listPreOrdersLocal } from "@/lib/leads";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default async function AdminPreOrdersPage() {
  const rows = await listPreOrdersLocal();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white font-['Outfit'] mb-6">
        Pre-order requests
      </h1>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400">No pre-orders yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <article
              key={row.id}
              className="p-4 rounded-2xl border border-white/10 bg-[#0B111E]"
            >
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <p className="text-white font-semibold">{row.name}</p>
                  <p className="text-xs text-slate-500">
                    {row.phone} · {row.status} ·{" "}
                    {new Date(row.created_at).toLocaleString()}
                  </p>
                </div>
                <a
                  href={buildWhatsAppUrl(
                    `Hello ${row.name}, regarding your pre-order for ${row.preferred_make ?? ""} ${row.preferred_model ?? ""}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#25D366]"
                >
                  WhatsApp
                </a>
              </div>
              <p className="text-sm text-slate-300 mt-2">
                {[row.preferred_make, row.preferred_model]
                  .filter(Boolean)
                  .join(" ")}{" "}
                {row.year_min || row.year_max
                  ? `(${row.year_min ?? "?"}–${row.year_max ?? "?"})`
                  : ""}
                {row.budget_bdt
                  ? ` · Budget ৳ ${Number(row.budget_bdt).toLocaleString()}`
                  : ""}
              </p>
              {row.notes && (
                <p className="text-xs text-slate-400 mt-2">{row.notes}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
