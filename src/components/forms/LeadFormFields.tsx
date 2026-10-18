"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/app/actions/leads";

const inputClass =
  "w-full bg-[#0f0f0f]/80 border border-white/10 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]";

function StatusBanner({ state }: { state: ActionResult | null }) {
  if (!state) return null;
  return (
    <div
      className={`rounded-md px-4 py-3 text-sm ${
        state.success
          ? "bg-green-500/15 border border-green-500/30 text-green-300"
          : "bg-red-500/15 border border-red-500/30 text-red-300"
      }`}
    >
      {state.message}
    </div>
  );
}

function Honeypot() {
  return (
    <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden>
      <label>
        Website
        <input type="text" name="website_url_hp" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function ContactForm({
  action,
}: {
  action: (
    prev: ActionResult | null,
    formData: FormData
  ) => Promise<ActionResult>;
}) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-4 relative">
      <Honeypot />
      <StatusBanner state={state} />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#b0b0b0]">Name *</label>
          <input name="name" required className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-[#b0b0b0]">Phone</label>
          <input name="phone" className={inputClass} placeholder="01XXXXXXXXX" />
        </div>
      </div>
      <div>
        <label className="text-xs text-[#b0b0b0]">Email</label>
        <input name="email" type="email" className={inputClass} />
      </div>
      <div>
        <label className="text-xs text-[#b0b0b0]">Subject *</label>
        <input name="subject" required className={inputClass} />
      </div>
      <div>
        <label className="text-xs text-[#b0b0b0]">Message *</label>
        <textarea name="message" required rows={5} className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full py-3 rounded-md text-sm disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

export function VerifyForm({
  action,
  initialChassis,
}: {
  action: (
    prev: ActionResult | null,
    formData: FormData
  ) => Promise<ActionResult>;
  initialChassis?: string;
}) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-4 relative">
      <Honeypot />
      <StatusBanner state={state} />
      <div>
        <label className="text-xs text-[#b0b0b0]">Chassis / VIN *</label>
        <input
          name="chassis"
          required
          defaultValue={initialChassis}
          placeholder="e.g. NZT260-3209892"
          className={inputClass}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#b0b0b0]">Your Name *</label>
          <input name="name" required className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-[#b0b0b0]">Mobile *</label>
          <input name="phone" required className={inputClass} />
        </div>
      </div>
      <div>
        <label className="text-xs text-[#b0b0b0]">Notes (optional)</label>
        <textarea name="notes" rows={3} className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full py-3 rounded-md text-sm disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Search / Request Verification"}
      </button>
    </form>
  );
}

export function PreOrderForm({
  action,
}: {
  action: (
    prev: ActionResult | null,
    formData: FormData
  ) => Promise<ActionResult>;
}) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-4 relative">
      <Honeypot />
      <StatusBanner state={state} />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#b0b0b0]">Name *</label>
          <input name="name" required className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-[#b0b0b0]">Mobile *</label>
          <input name="phone" required className={inputClass} />
        </div>
      </div>
      <div>
        <label className="text-xs text-[#b0b0b0]">Email</label>
        <input name="email" type="email" className={inputClass} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#b0b0b0]">Preferred Make</label>
          <input name="preferred_make" className={inputClass} placeholder="Toyota" />
        </div>
        <div>
          <label className="text-xs text-[#b0b0b0]">Preferred Model</label>
          <input name="preferred_model" className={inputClass} placeholder="Harrier" />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-[#b0b0b0]">Year Min</label>
          <input name="year_min" type="number" className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-[#b0b0b0]">Year Max</label>
          <input name="year_max" type="number" className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-[#b0b0b0]">Budget (BDT)</label>
          <input name="budget_bdt" type="number" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="text-xs text-[#b0b0b0]">Notes</label>
        <textarea name="notes" rows={4} className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full py-3 rounded-md text-sm disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit Pre-Order Request"}
      </button>
    </form>
  );
}
