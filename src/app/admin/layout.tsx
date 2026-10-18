import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/vehicles", label: "Vehicles" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/pre-orders", label: "Pre-Orders" },
  { href: "/admin/delivered-cars", label: "Delivered" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const demo = !isSupabaseConfigured();

  return (
    <div className="min-h-screen bg-[#050811] text-slate-200">
      <header className="border-b border-white/10 bg-[#0B111E]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-bold text-white font-['Outfit']">
              Car Choice BD Admin
            </Link>
            {demo && (
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Demo mode (mock data)
              </span>
            )}
          </div>
          <nav className="flex flex-wrap gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#D4AF37]"
            >
              View site
            </Link>
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
