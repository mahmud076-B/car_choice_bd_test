import Link from "next/link";
import { listPublishedVehicles, listAllVehiclesAdmin } from "@/lib/vehicles";
import { listInquiriesLocal, listPreOrdersLocal } from "@/lib/leads";
import { listDeliveredCars } from "@/lib/delivered";

export default async function AdminDashboardPage() {
  const [all, published, inquiries, preOrders, delivered] = await Promise.all([
    listAllVehiclesAdmin(),
    listPublishedVehicles(),
    listInquiriesLocal(),
    listPreOrdersLocal(),
    listDeliveredCars(),
  ]);

  const cards = [
    {
      label: "Vehicles",
      value: all.length,
      sub: `${published.length} published`,
      href: "/admin/vehicles",
    },
    {
      label: "Inquiries",
      value: inquiries.length,
      sub: `${inquiries.filter((i) => i.status === "NEW").length} new`,
      href: "/admin/inquiries",
    },
    {
      label: "Pre-orders",
      value: preOrders.length,
      sub: `${preOrders.filter((p) => p.status === "NEW").length} new`,
      href: "/admin/pre-orders",
    },
    {
      label: "Delivered",
      value: delivered.length,
      sub: "gallery items",
      href: "/admin/delivered-cars",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white font-['Outfit']">
        Dashboard
      </h1>
      <p className="text-sm text-slate-400 mt-1">
        Manage inventory, leads, and delivered-car social proof.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="p-5 rounded-2xl bg-[#0B111E] border border-white/10 hover:border-[#D4AF37]/40 transition-colors"
          >
            <p className="text-xs uppercase tracking-wider text-slate-500">
              {c.label}
            </p>
            <p className="text-3xl font-bold text-white mt-2 font-mono">
              {c.value}
            </p>
            <p className="text-xs text-[#D4AF37] mt-1">{c.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 p-5 rounded-2xl border border-white/10 bg-[#0B111E] text-sm text-slate-400">
        <p className="text-white font-semibold mb-2">Quick actions</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link href="/admin/vehicles/new" className="text-[#D4AF37] hover:underline">
              Add a new vehicle
            </Link>
          </li>
          <li>
            <Link href="/stock" className="text-[#D4AF37] hover:underline">
              Preview public stock
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
