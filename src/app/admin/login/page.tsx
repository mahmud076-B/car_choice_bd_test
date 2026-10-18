"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setPending(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 rounded-2xl bg-[#0B111E] border border-white/10">
      <h1 className="text-2xl font-bold text-white font-['Outfit']">
        Staff login
      </h1>
      <p className="text-xs text-slate-400 mt-2">
        Use your Supabase Auth email/password. Without env credentials, demo
        mode opens the dashboard directly.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {error && (
          <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        <div>
          <label className="text-xs text-slate-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 bg-[#141E33] border border-white/10 rounded-xl px-3 py-2.5 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 bg-[#141E33] border border-white/10 rounded-xl px-3 py-2.5 text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 rounded-xl text-sm font-bold text-slate-950 bg-[#D4AF37] disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
