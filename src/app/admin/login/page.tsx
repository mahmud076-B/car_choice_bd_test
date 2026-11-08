"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      router.push("/admin");
      router.refresh();
      return;
    }

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        setError(authError.message);
        setPending(false);
        return;
      }

      const { data: isStaff, error: staffError } =
        await supabase.rpc("is_staff");
      if (staffError || isStaff !== true) {
        await supabase.auth.signOut();
        setError(
          "Unauthorized: This account is not registered as Car Choice BD showroom staff."
        );
        setPending(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setPending(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#0f0f0f] border border-white/12 p-7 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-14 w-14 overflow-hidden flex items-center justify-center mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt=""
              aria-hidden
              className="h-[160%] w-[160%] max-w-none object-contain brightness-0 invert drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
            />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white leading-none font-['Outfit']">
            CAR <span className="text-[#d4af37]">CHOICE</span> BD
          </span>
          <span className="mt-2.5 text-[11px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold">
            Showroom Staff Console
          </span>
          <h1 className="text-2xl font-bold text-white font-['Outfit'] mt-3">
            Sign in to Admin
          </h1>
          <p className="text-xs text-[#b0b0b0] mt-1.5 leading-relaxed">
            Enter your authorized Car Choice BD staff email and password to
            manage inventory, customer leads, and showroom duty sheets.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          {error && (
            <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-3.5 py-2.5">
              {error}
            </div>
          )}
          <div>
            <label className="text-xs font-medium text-[#b0b0b0]">
              Staff Email
            </label>
            <div className="relative mt-1.5">
              <Mail className="w-4 h-4 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@carchoicebd.com"
                className="w-full bg-[#161616] border border-white/12 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#b0b0b0]">
              Password
            </label>
            <div className="relative mt-1.5">
              <Lock className="w-4 h-4 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#161616] border border-white/12 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full py-3 rounded-xl text-sm inline-flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in to Dashboard"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-white/10 text-center">
          <Link
            href="/"
            className="text-xs text-[#b0b0b0] hover:text-[#d4af37] transition-colors"
          >
            ← Return to Public Showroom
          </Link>
        </div>
      </div>
    </div>
  );
}
