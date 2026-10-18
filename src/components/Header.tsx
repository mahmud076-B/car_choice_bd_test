"use client";

import React, { useEffect, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Verify Auction Sheet", href: "/verify-auction-sheet" },
  { label: "Delivered Cars", href: "/delivered-cars" },
  { label: "Stock List", href: "/stock" },
  {
    label: "Payment",
    href: "#",
    children: [
      { label: "How to Buy", href: "/how-to-buy" },
      { label: "Pre-Order Japan", href: "/pre-order" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const toggleId = useId();
  const paymentId = useId();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const el = document.getElementById(toggleId) as HTMLInputElement | null;
    if (el) el.checked = false;
    const pay = document.getElementById(paymentId) as HTMLInputElement | null;
    if (pay) pay.checked = false;
  }, [pathname, toggleId, paymentId]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* CSS checkbox menu — opens on phone even when React/LAN JS is blocked */}
      <div className="group/mobile relative">
        <input id={toggleId} type="checkbox" className="peer/nav sr-only" />

        <nav className="nav-glass backdrop-blur-[64px] backdrop-saturate-150 relative z-[80]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-[68px] sm:h-[80px] gap-4">
              <Link
                href="/"
                className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0"
                aria-label="Car Choice BD home"
              >
                <span className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.svg"
                    alt=""
                    aria-hidden
                    className="h-[160%] w-[160%] max-w-none object-contain brightness-0 invert drop-shadow-[0_0_10px_rgba(212,175,55,0.35)]"
                  />
                </span>
                <span className="relative font-extrabold text-[15px] sm:text-lg tracking-tight text-white leading-none min-w-0">
                  CAR{" "}
                  <span className="text-[#d4af37]">
                    CHOIC
                    <span className="relative inline-block">
                      E
                      <span className="absolute -top-[0.55em] left-full ml-0.5 rounded-[2px] bg-[#d4af37] px-[3px] py-[1px] text-[7px] sm:text-[8px] font-bold leading-none tracking-wide text-[#0b1426]">
                        BD
                      </span>
                    </span>
                  </span>
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-0.5">
                {navLinks.map((link) =>
                  link.children ? (
                    <div key={link.label} className="relative group">
                      <button
                        type="button"
                        className="px-3 py-2 text-sm font-medium text-white/80 hover:text-[#d4af37] inline-flex items-center gap-1 transition-colors"
                      >
                        {link.label}
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <div className="absolute left-0 top-full hidden group-hover:block min-w-[180px] py-1 z-50 rounded-xl border border-white/10 bg-[#0b1426]/95 backdrop-blur-xl shadow-xl">
                        {link.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="block px-4 py-2.5 text-sm text-white/80 hover:text-[#d4af37] hover:bg-white/5"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "text-[#d4af37]"
                          : "text-white/80 hover:text-[#d4af37]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>

              <label
                htmlFor={toggleId}
                className="lg:hidden relative z-[90] flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40 shrink-0 touch-manipulation cursor-pointer select-none shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-300 group-has-[:checked]/mobile:rounded-full group-has-[:checked]/mobile:bg-[#d4af37] group-has-[:checked]/mobile:text-[#0b1426] group-has-[:checked]/mobile:rotate-90 group-has-[:checked]/mobile:shadow-[0_0_24px_rgba(212,175,55,0.45)]"
                aria-label="Toggle Navigation"
              >
                <Menu className="w-5 h-5 group-has-[:checked]/mobile:hidden" />
                <X className="w-5 h-5 hidden group-has-[:checked]/mobile:block" />
              </label>
            </div>
          </div>
        </nav>

        <label
          htmlFor={toggleId}
          className="lg:hidden fixed inset-0 z-[40] bg-black/50 backdrop-blur-[2px] opacity-0 pointer-events-none peer-checked/nav:opacity-100 peer-checked/nav:pointer-events-auto transition-opacity duration-300"
          aria-label="Close menu"
        />

        <div className="mobile-nav-panel lg:hidden fixed top-[68px] sm:top-[80px] left-3 right-3 z-[60] max-h-[calc(100dvh-84px)] overflow-y-auto rounded-2xl border border-white/15 bg-[#0b1426]/72 px-3 py-3 space-y-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl -translate-y-3 opacity-0 pointer-events-none peer-checked/nav:translate-y-0 peer-checked/nav:opacity-100 peer-checked/nav:pointer-events-auto transition-all duration-300">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="group/pay relative">
                <input
                  id={paymentId}
                  type="checkbox"
                  className="peer/pay sr-only"
                />
                <label
                  htmlFor={paymentId}
                  className="mobile-nav-row w-full flex justify-between items-center px-3 py-3.5 text-left font-medium text-white/90 touch-manipulation cursor-pointer rounded-xl border border-white/10 bg-white/[0.04]"
                >
                  {link.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-has-[:checked]/pay:rotate-180" />
                </label>
                <div className="hidden peer-checked/pay:block">
                  {link.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block pl-6 pr-3 py-3 text-sm text-white/55 touch-manipulation"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-nav-row block px-3 py-3.5 rounded-xl font-medium touch-manipulation border border-white/10 bg-white/[0.04] backdrop-blur-md ${
                  isActive(link.href)
                    ? "text-[#d4af37] border-[#d4af37]/40 bg-[#d4af37]/10"
                    : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
