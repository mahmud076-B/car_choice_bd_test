"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Upload,
  FileCheck2,
  Image as ImageIcon,
  Save,
} from "lucide-react";
import { saveVehicleAction } from "@/app/actions/vehicles";
import { createClient } from "@/lib/supabase/client";
import type { Vehicle } from "@/lib/types";

const field =
  "w-full bg-[#161616] border border-white/12 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors";
const labelClass =
  "block text-xs font-semibold text-[#b0b0b0] uppercase tracking-wider mb-1.5";

export default function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  const [state, action, pending] = useActionState(saveVehicleAction, null);

  const initialGallery = (vehicle?.images ?? [])
    .filter((img) => !img.isCover && !img.isAuctionSheet)
    .map((img) => img.url)
    .join("\n");

  const initialAuctionSheet =
    (vehicle?.images ?? []).find((img) => img.isAuctionSheet)?.url ?? "";

  const [coverUrl, setCoverUrl] = useState(
    vehicle?.imageUrl ?? "/vehicles/harrier.jpg"
  );
  const [galleryUrls, setGalleryUrls] = useState(initialGallery);
  const [auctionSheetUrl, setAuctionSheetUrl] = useState(initialAuctionSheet);
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleStorageUpload(
    file: File,
    target: "cover" | "gallery" | "sheet"
  ) {
    setUploadError(null);
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      setUploadError(
        "Supabase Storage is not connected yet. Paste a public path (e.g. /vehicles/harrier.jpg) or external https URL."
      );
      return;
    }

    setUploading(target);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      const filePath = `vehicles/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;

      const { error } = await supabase.storage
        .from("vehicle-media")
        .upload(filePath, file, { upsert: true });

      if (error) {
        setUploadError(error.message);
        setUploading(null);
        return;
      }

      const { data } = supabase.storage
        .from("vehicle-media")
        .getPublicUrl(filePath);

      if (target === "cover") {
        setCoverUrl(data.publicUrl);
      } else if (target === "sheet") {
        setAuctionSheetUrl(data.publicUrl);
      } else {
        setGalleryUrls((prev) =>
          prev.trim() ? `${prev.trim()}\n${data.publicUrl}` : data.publicUrl
        );
      }
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  return (
    <form action={action} className="space-y-6 max-w-4xl">
      <input type="hidden" name="id" value={vehicle?.id ?? ""} />

      {state && (
        <div
          className={`flex flex-wrap items-center justify-between gap-3 text-sm rounded-xl px-4 py-3 border ${
            state.ok
              ? "border-[#25d366]/40 text-[#6ee7a0] bg-[#25d366]/10"
              : "border-red-500/40 text-red-300 bg-red-500/10"
          }`}
        >
          <span className="inline-flex items-center gap-2 font-medium">
            {state.ok && <CheckCircle2 className="w-4 h-4" />}
            {state.message}
          </span>
          {state.ok && (
            <Link
              href={`/stock/${state.slug ?? vehicle?.slug ?? ""}`}
              className="text-xs font-bold text-[#d4af37] underline"
            >
              View on Public Site →
            </Link>
          )}
        </div>
      )}

      {/* Section 1: Vehicle Identity */}
      <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/10 space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold">
            01 · Identity
          </p>
          <h2 className="text-lg font-bold text-white font-['Outfit']">
            Make, Model & Trim
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Make *</label>
            <input
              name="make"
              required
              defaultValue={vehicle?.make ?? "Toyota"}
              placeholder="Toyota"
              className={field}
            />
          </div>
          <div>
            <label className={labelClass}>Model *</label>
            <input
              name="model"
              required
              defaultValue={vehicle?.model}
              placeholder="Harrier"
              className={field}
            />
          </div>
          <div>
            <label className={labelClass}>Package / Trim</label>
            <input
              name="package"
              defaultValue={vehicle?.package}
              placeholder="Z Leather Package"
              className={field}
            />
          </div>
          <div>
            <label className={labelClass}>Model Year</label>
            <input
              name="year"
              type="number"
              defaultValue={vehicle?.year ?? 2024}
              className={field}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>
              Custom URL Slug (leave blank to auto-generate)
            </label>
            <input
              name="slug"
              defaultValue={vehicle?.slug}
              placeholder="toyota-harrier-z-leather-package-2024"
              className={field}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Japanese Auction & Technical Specs */}
      <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/10 space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold">
            02 · Technical & Auction Specs
          </p>
          <h2 className="text-lg font-bold text-white font-['Outfit']">
            Chassis, Grade & Powertrain
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Chassis / VIN Code</label>
            <input
              name="chassisPrefix"
              defaultValue={vehicle?.chassisPrefix}
              placeholder="AXUH80-1094821"
              className={`${field} font-mono`}
            />
          </div>
          <div>
            <label className={labelClass}>Japanese Auction Grade</label>
            <input
              name="grade"
              defaultValue={vehicle?.grade ?? "4.5 / A"}
              placeholder="5.0 / A"
              className={field}
            />
          </div>
          <div>
            <label className={labelClass}>Verified Mileage (KM)</label>
            <input
              name="mileage"
              type="number"
              defaultValue={vehicle?.mileage ?? 12000}
              className={field}
            />
          </div>
          <div>
            <label className={labelClass}>Engine Displacement (CC)</label>
            <input
              name="engineCc"
              type="number"
              defaultValue={vehicle?.engineCc ?? 2000}
              className={field}
            />
          </div>
          <div>
            <label className={labelClass}>Fuel Type</label>
            <select
              name="fuelType"
              defaultValue={vehicle?.fuelType ?? "Hybrid"}
              className={field}
            >
              <option className="bg-[#0f0f0f]">Hybrid</option>
              <option className="bg-[#0f0f0f]">Petrol</option>
              <option className="bg-[#0f0f0f]">Diesel</option>
              <option className="bg-[#0f0f0f]">EV</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Transmission</label>
            <input
              name="transmission"
              defaultValue={vehicle?.transmission ?? "e-CVT"}
              placeholder="e-CVT / Automatic"
              className={field}
            />
          </div>
          <div>
            <label className={labelClass}>Drive Type</label>
            <select
              name="drive"
              defaultValue={vehicle?.drive ?? "2WD"}
              className={field}
            >
              <option className="bg-[#0f0f0f]">2WD</option>
              <option className="bg-[#0f0f0f]">4WD</option>
              <option className="bg-[#0f0f0f]">AWD</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Body Type</label>
            <select
              name="bodyType"
              defaultValue={vehicle?.bodyType ?? "SUV / Crossover"}
              className={field}
            >
              <option className="bg-[#0f0f0f]">SUV / Crossover</option>
              <option className="bg-[#0f0f0f]">Sedan</option>
              <option className="bg-[#0f0f0f]">Van / MPV</option>
              <option className="bg-[#0f0f0f]">Hatchback</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Exterior Color</label>
            <input
              name="color"
              defaultValue={vehicle?.color ?? "Pearl White Crystal Shine"}
              placeholder="Pearl White"
              className={field}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Pricing & Showroom Availability */}
      <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/10 space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold">
            03 · Pricing & Availability
          </p>
          <h2 className="text-lg font-bold text-white font-['Outfit']">
            Showroom Status & Publication
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Price Display Mode</label>
            <select
              name="priceMode"
              defaultValue={vehicle?.priceMode ?? "EXACT"}
              className={field}
            >
              <option value="EXACT" className="bg-[#0f0f0f]">
                EXACT (Show BDT Price)
              </option>
              <option value="CALL_FOR_PRICE" className="bg-[#0f0f0f]">
                CALL_FOR_PRICE
              </option>
              <option value="UPON_REQUEST" className="bg-[#0f0f0f]">
                UPON_REQUEST
              </option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Numeric Price (BDT)</label>
            <input
              name="priceBdt"
              type="number"
              defaultValue={vehicle?.priceBdt ?? ""}
              placeholder="8450000"
              className={field}
            />
          </div>
          <div>
            <label className={labelClass}>
              Formatted Price Label (auto-formats if blank)
            </label>
            <input
              name="priceDisplay"
              defaultValue={vehicle?.priceDisplay}
              placeholder="৳ 84,50,000"
              className={field}
            />
          </div>

          <div>
            <label className={labelClass}>Inventory Status</label>
            <select
              name="status"
              defaultValue={vehicle?.status ?? "READY_STOCK"}
              className={field}
            >
              <option value="READY_STOCK" className="bg-[#0f0f0f]">
                READY_STOCK
              </option>
              <option value="PORT_STOCK" className="bg-[#0f0f0f]">
                PORT_STOCK
              </option>
              <option value="IN_TRANSIT" className="bg-[#0f0f0f]">
                IN_TRANSIT
              </option>
              <option value="RESERVED" className="bg-[#0f0f0f]">
                RESERVED
              </option>
              <option value="SOLD" className="bg-[#0f0f0f]">
                SOLD
              </option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Public Badge Label</label>
            <input
              name="statusLabel"
              defaultValue={vehicle?.statusLabel ?? "Ready in Showroom"}
              placeholder="Ready in Showroom"
              className={field}
            />
          </div>
          <div>
            <label className={labelClass}>Current Location</label>
            <select
              name="location"
              defaultValue={vehicle?.location ?? "Rajshahi Showroom"}
              className={field}
            >
              <option className="bg-[#0f0f0f]">Rajshahi Showroom</option>
              <option className="bg-[#0f0f0f]">Mongla Port</option>
              <option className="bg-[#0f0f0f]">Chattogram Port</option>
              <option className="bg-[#0f0f0f]">Japan Auction</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Publication Status</label>
            <select
              name="publicationStatus"
              defaultValue={vehicle?.publicationStatus ?? "PUBLISHED"}
              className={field}
            >
              <option value="PUBLISHED" className="bg-[#0f0f0f]">
                PUBLISHED (Live on /stock)
              </option>
              <option value="DRAFT" className="bg-[#0f0f0f]">
                DRAFT (Staff only)
              </option>
              <option value="ARCHIVED" className="bg-[#0f0f0f]">
                ARCHIVED (Hidden)
              </option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-6 text-sm text-white">
          <label className="inline-flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={vehicle?.featured ?? true}
              className="accent-[#d4af37] w-4 h-4"
            />
            <span>Feature on Homepage</span>
          </label>
          <label className="inline-flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="isNegotiable"
              defaultChecked={vehicle?.isNegotiable ?? true}
              className="accent-[#d4af37] w-4 h-4"
            />
            <span>Price Negotiable</span>
          </label>
          <label className="inline-flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="auctionSheetAvailable"
              defaultChecked={vehicle?.auctionSheetAvailable ?? true}
              className="accent-[#d4af37] w-4 h-4"
            />
            <span>Verified Japanese Auction Sheet Available</span>
          </label>
        </div>
      </div>

      {/* Section 4: Photos & Japanese Auction Sheet */}
      <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/10 space-y-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold">
            04 · Media & Auction Sheet
          </p>
          <h2 className="text-lg font-bold text-white font-['Outfit']">
            Cover Photo, Multi-Angle Gallery & Auction Sheet Scan
          </h2>
          <p className="text-xs text-[#b0b0b0] mt-1">
            Paste public paths (e.g.{" "}
            <code className="text-[#d4af37]">/vehicles/harrier.jpg</code>) or
            upload directly to Supabase Storage (<code className="text-white">vehicle-media</code>).
          </p>
        </div>

        {uploadError && (
          <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl px-3.5 py-2.5">
            {uploadError}
          </div>
        )}

        <div className="space-y-4">
          {/* Cover Image */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#b0b0b0] uppercase tracking-wider inline-flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#d4af37]" />
                Primary Cover Photo URL *
              </label>
              <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] cursor-pointer hover:underline">
                <Upload className="w-3.5 h-3.5" />
                {uploading === "cover" ? "Uploading…" : "Upload Cover File"}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleStorageUpload(file, "cover");
                  }}
                />
              </label>
            </div>
            <input
              name="imageUrl"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className={field}
            />
          </div>

          {/* Additional Gallery URLs */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#b0b0b0] uppercase tracking-wider">
                Additional Gallery Photo URLs (one per line or comma-separated)
              </label>
              <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] cursor-pointer hover:underline">
                <Upload className="w-3.5 h-3.5" />
                {uploading === "gallery" ? "Uploading…" : "Upload Gallery Photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleStorageUpload(file, "gallery");
                  }}
                />
              </label>
            </div>
            <textarea
              name="galleryUrls"
              rows={3}
              value={galleryUrls}
              onChange={(e) => setGalleryUrls(e.target.value)}
              placeholder="/vehicles/harrier.jpg"
              className={field}
            />
          </div>

          {/* Dedicated Auction Sheet Scan */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#b0b0b0] uppercase tracking-wider inline-flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-[#d4af37]" />
                Japanese Auction Sheet Scan URL (Tagged in Lightbox)
              </label>
              <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] cursor-pointer hover:underline">
                <Upload className="w-3.5 h-3.5" />
                {uploading === "sheet"
                  ? "Uploading…"
                  : "Upload Auction Sheet"}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleStorageUpload(file, "sheet");
                  }}
                />
              </label>
            </div>
            <input
              name="auctionSheetUrl"
              value={auctionSheetUrl}
              onChange={(e) => setAuctionSheetUrl(e.target.value)}
              placeholder="Optional URL to auction sheet scan"
              className={field}
            />
          </div>
        </div>
      </div>

      {/* Section 5: Features */}
      <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/10 space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold">
            05 · Equipment & Highlights
          </p>
          <h2 className="text-lg font-bold text-white font-['Outfit']">
            Key Vehicle Features (Comma-Separated)
          </h2>
        </div>
        <textarea
          name="features"
          rows={3}
          defaultValue={
            vehicle?.features.join(", ") ??
            "Panoramic Sunroof, Toyota Safety Sense, 360 Camera, Leather Seats"
          }
          className={field}
        />
      </div>

      {/* Submit Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {pending ? "Saving Vehicle…" : "Save & Publish Vehicle"}
        </button>
        <Link
          href="/admin/vehicles"
          className="btn-ghost px-6 py-3.5 rounded-full text-sm"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
