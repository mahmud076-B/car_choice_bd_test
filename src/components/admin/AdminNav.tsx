"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  Globe2,
  Award,
  Calculator,
  ExternalLink,
  LogOut,
  Plus,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Counts = {
  newInquiries: number;
  newPreOrders: number;
};

export default function AdminNav({
  demo,
  counts,
}: {
  demo: boolean;
  counts: Counts;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return null;
  }

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/admin/vehicles",
      label: "Vehicles",
      icon: Car,
    },
    {
      href: "/admin/inquiries",
      label: "Inquiries",
      icon: MessageSquare,
      badge: counts.newInquiries,
    },
    {
      href: "/admin/pre-orders",
      label: "Pre-Orders",
      icon: Globe2,
      badge: counts.newPreOrders,
    },
    {
      href: "/admin/delivered-cars",
      label: "Delivered",
      icon: Award,
    },
    {
      href: "/admin/duty",
      label: "Duty Sheet",
      icon: Calculator,
    },
  ];

  async function handleSignOut() {
    if (demo) return;
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3.5">
          {/* Official Brand Wordmark + Staff Badge */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 shrink-0"
              aria-label="Car Choice BD Admin"
            >
              <span className="relative h-10 w-10 shrink-0 overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt=""
                  aria-hidden
                  className="h-[155%] w-[155%] max-w-none object-contain brightness-0 invert drop-shadow-[0_0_10px_rgba(212,175,55,0.35)]"
                />
              </span>
              <span className="font-extrabold text-[15px] sm:text-base tracking-tight text-white leading-none font-['Outfit']">
                CAR <span className="text-[#d4af37]">CHOICE</span> BD
              </span>
            </Link>

            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-0.5 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 text-[#d4af37]">
              Staff Console
            </span>

            {demo && (
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Demo Mode
              </span>
            )}
          </div>

          {/* Right Quick Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin/vehicles/new"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#d4af37] text-[#0b1426] hover:bg-[#e0c04a] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Vehicle
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#d4af37] border border-[#d4af37]/35 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 transition-colors"
            >
              View Site
              <ExternalLink className="w-3 h-3" />
            </Link>
            {!demo && (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#b0b0b0] border border-white/10 bg-white/[0.04] hover:text-white hover:border-white/25 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Strip */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-3 no-scrollbar">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                  active
                    ? "border-[#d4af37]/45 bg-[#d4af37]/15 text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.12)]"
                    : "border-transparent text-[#b0b0b0] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                {item.label}
                {typeof item.badge === "number" && item.badge > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#d4af37] text-[#0b1426]">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

