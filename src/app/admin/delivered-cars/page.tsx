import { listDeliveredCars } from "@/lib/delivered";
import DeliveredAdminForm from "@/components/admin/DeliveredAdminForm";

export default async function AdminDeliveredPage() {
  const items = await listDeliveredCars();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white font-['Outfit']">
        Delivered cars CMS
      </h1>
      <DeliveredAdminForm />
      <ul className="text-sm text-slate-400 space-y-2">
        {items.map((i) => (
          <li
            key={i.id}
            className="p-3 rounded-xl border border-white/10 bg-[#0B111E]"
          >
            <span className="text-white font-medium">{i.title}</span>
            <span className="text-xs text-[#D4AF37] ml-2">{i.modelYear}</span>
            {i.caption && (
              <p className="text-xs text-slate-500 mt-1">{i.caption}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
