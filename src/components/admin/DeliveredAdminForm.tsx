"use client";

import { useActionState, useState, useTransition } from "react";
import Image from "next/image";
import { Upload, Plus, Trash2, CheckCircle2 } from "lucide-react";
import {
  addDeliveredAction,
  deleteDeliveredAction,
} from "@/app/actions/delivered";
import { createClient } from "@/lib/supabase/client";
import type { DeliveredCar } from "@/lib/types";

const field =
  "w-full bg-[#161616] border border-white/12 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]";

export default function DeliveredAdminForm({
  initialItems = [],
}: {
  initialItems?: DeliveredCar[];
}) {
  const [state, action, pending] = useActionState(addDeliveredAction, null);
  const [imageUrl, setImageUrl] = useState("/vehicles/harrier.jpg");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDeleting, startDelete] = useTransition();

  async function handleFileUpload(file: File) {
    setUploadError(null);
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      setUploadError(
        "Supabase Storage is not connected yet. Paste a public path (e.g. /vehicles/harrier.jpg)."
      );
      return;
    }

    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      const filePath = `delivered/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;

      const { error } = await supabase.storage
        .from("vehicle-media")
        .upload(filePath, file, { upsert: true });

      if (error) {
        setUploadError(error.message);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from("vehicle-media")
        .getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleDelete(id: string, title: string) {
    if (!window.confirm(`Remove "${title}" from Delivered Cars showcase?`)) {
      return;
    }
    startDelete(async () => {
      await deleteDeliveredAction(id);
    });
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Left: Add Form */}
      <form
        action={action}
        className="lg:col-span-5 p-6 rounded-2xl border border-white/10 bg-[#0f0f0f] space-y-4"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold">
            Publish Handover
          </p>
          <h2 className="text-lg font-bold text-white font-['Outfit'] mt-0.5">
            Add Delivered Vehicle
          </h2>
        </div>

        {state && (
          <p
            className={`text-xs rounded-xl px-3.5 py-2.5 border flex items-center gap-2 ${
              state.ok
                ? "border-[#25d366]/40 text-[#6ee7a0] bg-[#25d366]/10"
                : "border-red-500/40 text-red-300 bg-red-500/10"
            }`}
          >
            {state.ok && <CheckCircle2 className="w-4 h-4 shrink-0" />}
            {state.message}
          </p>
        )}

        {uploadError && (
          <p className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-2">
            {uploadError}
          </p>
        )}

        <div>
          <label className="block text-xs font-semibold text-[#b0b0b0] uppercase tracking-wider mb-1.5">
            Vehicle Title *
          </label>
          <input
            name="title"
            required
            placeholder="e.g. Toyota Harrier Z Leather"
            className={field}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#b0b0b0] uppercase tracking-wider mb-1.5">
            Model Year
          </label>
          <input name="modelYear" placeholder="2024" className={field} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#b0b0b0] uppercase tracking-wider">
              Handover Photo URL *
            </label>
            <label className="inline-flex items-center gap-1 text-xs font-semibold text-[#d4af37] cursor-pointer hover:underline">
              <Upload className="w-3.5 h-3.5" />
              {uploading ? "Uploading…" : "Upload Photo"}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
            </label>
          </div>
          <input
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="/vehicles/harrier.jpg"
            className={field}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#b0b0b0] uppercase tracking-wider mb-1.5">
            Handover Caption
          </label>
          <input
            name="caption"
            placeholder="Handed over in Rajshahi showroom"
            className={field}
          />
        </div>

        <label className="flex items-center gap-2.5 text-xs text-white pt-1 cursor-pointer">
          <input
            type="checkbox"
            name="customerConsent"
            required
            defaultChecked
            className="accent-[#d4af37] w-4 h-4"
          />
          <span>Customer consent obtained for public showroom gallery</span>
        </label>

        <button
          type="submit"
          disabled={pending}
          className="btn-primary w-full py-3 rounded-full text-xs inline-flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <Plus className="w-4 h-4" />
          {pending ? "Publishing…" : "Add to Delivered Showcase"}
        </button>
      </form>

      {/* Right: Visual Showcase Grid */}
      <div
        className={`lg:col-span-7 space-y-4 ${isDeleting ? "opacity-75" : ""}`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white font-['Outfit']">
            Published Handovers ({initialItems.length})
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {initialItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f0f] flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] bg-black">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    {item.modelYear && (
                      <span className="text-xs font-semibold text-[#d4af37]">
                        Model {item.modelYear}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-2 rounded-xl bg-black/70 text-red-300 hover:bg-red-500/20 hover:text-red-200 border border-white/10 transition-colors"
                    title="Remove delivered car"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {item.caption && (
                <p className="p-3.5 text-xs text-[#b0b0b0]">{item.caption}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
