"use client";

import { useActionState } from "react";
import { addDeliveredAction } from "@/app/actions/delivered";

export default function DeliveredAdminForm() {
  const [state, action, pending] = useActionState(addDeliveredAction, null);

  return (
    <form
      action={action}
      className="p-5 rounded-2xl border border-white/10 bg-[#0B111E] space-y-3 max-w-xl"
    >
      {state && (
        <p className={`text-sm ${state.ok ? "text-green-300" : "text-red-300"}`}>
          {state.message}
        </p>
      )}
      <input
        name="title"
        required
        placeholder="Title e.g. Toyota Harrier Z"
        className="w-full bg-[#141E33] border border-white/10 rounded-lg px-3 py-2 text-sm"
      />
      <input
        name="modelYear"
        placeholder="Year"
        className="w-full bg-[#141E33] border border-white/10 rounded-lg px-3 py-2 text-sm"
      />
      <input
        name="imageUrl"
        placeholder="Image URL /public path"
        defaultValue="/vehicles/harrier.jpg"
        className="w-full bg-[#141E33] border border-white/10 rounded-lg px-3 py-2 text-sm"
      />
      <input
        name="caption"
        placeholder="Caption"
        className="w-full bg-[#141E33] border border-white/10 rounded-lg px-3 py-2 text-sm"
      />
      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input type="checkbox" name="customerConsent" required />
        Customer consent obtained
      </label>
      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-[#D4AF37] disabled:opacity-60"
      >
        {pending ? "Saving…" : "Add delivered car"}
      </button>
    </form>
  );
}
