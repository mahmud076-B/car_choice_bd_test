"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveVehicleAction } from "@/app/actions/vehicles";
import type { Vehicle } from "@/lib/types";

const field =
  "w-full bg-[#141E33] border border-white/10 rounded-lg px-3 py-2 text-sm text-white";

export default function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  const [state, action, pending] = useActionState(saveVehicleAction, null);

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <input type="hidden" name="id" value={vehicle?.id ?? ""} />
      {state && (
        <p
          className={`text-sm rounded-lg px-3 py-2 border ${
            state.ok
              ? "border-green-500/40 text-green-300 bg-green-500/10"
              : "border-red-500/40 text-red-300 bg-red-500/10"
          }`}
        >
          {state.message}
          {state.ok && state.id && (
            <>
              {" "}
              <Link
                href={`/stock/${vehicle?.slug ?? ""}`}
                className="underline"
              >
                View on site
              </Link>
            </>
          )}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-400">Make *</label>
          <input name="make" required defaultValue={vehicle?.make} className={field} />
        </div>
        <div>
          <label className="text-xs text-slate-400">Model *</label>
          <input name="model" required defaultValue={vehicle?.model} className={field} />
        </div>
        <div>
          <label className="text-xs text-slate-400">Package</label>
          <input name="package" defaultValue={vehicle?.package} className={field} />
        </div>
        <div>
          <label className="text-xs text-slate-400">Slug</label>
          <input name="slug" defaultValue={vehicle?.slug} className={field} />
        </div>
        <div>
          <label className="text-xs text-slate-400">Year</label>
          <input
            name="year"
            type="number"
            defaultValue={vehicle?.year ?? 2024}
            className={field}
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Grade</label>
          <input name="grade" defaultValue={vehicle?.grade} className={field} />
        </div>
        <div>
          <label className="text-xs text-slate-400">Mileage</label>
          <input
            name="mileage"
            type="number"
            defaultValue={vehicle?.mileage ?? 0}
            className={field}
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Engine CC</label>
          <input
            name="engineCc"
            type="number"
            defaultValue={vehicle?.engineCc ?? 0}
            className={field}
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Fuel</label>
          <select name="fuelType" defaultValue={vehicle?.fuelType ?? "Hybrid"} className={field}>
            <option>Hybrid</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>EV</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400">Color</label>
          <input name="color" defaultValue={vehicle?.color} className={field} />
        </div>
        <div>
          <label className="text-xs text-slate-400">Chassis</label>
          <input
            name="chassisPrefix"
            defaultValue={vehicle?.chassisPrefix}
            className={field}
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Transmission</label>
          <input
            name="transmission"
            defaultValue={vehicle?.transmission}
            className={field}
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Drive</label>
          <select name="drive" defaultValue={vehicle?.drive ?? "2WD"} className={field}>
            <option>2WD</option>
            <option>4WD</option>
            <option>AWD</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400">Body</label>
          <select
            name="bodyType"
            defaultValue={vehicle?.bodyType ?? "SUV / Crossover"}
            className={field}
          >
            <option>SUV / Crossover</option>
            <option>Sedan</option>
            <option>Van / MPV</option>
            <option>Hatchback</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400">Inventory status</label>
          <select
            name="status"
            defaultValue={vehicle?.status ?? "READY_STOCK"}
            className={field}
          >
            <option value="READY_STOCK">READY_STOCK</option>
            <option value="PORT_STOCK">PORT_STOCK</option>
            <option value="IN_TRANSIT">IN_TRANSIT</option>
            <option value="RESERVED">RESERVED</option>
            <option value="SOLD">SOLD</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400">Status label</label>
          <input
            name="statusLabel"
            defaultValue={vehicle?.statusLabel ?? "Ready in Showroom"}
            className={field}
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Location</label>
          <select
            name="location"
            defaultValue={vehicle?.location ?? "Rajshahi Showroom"}
            className={field}
          >
            <option>Rajshahi Showroom</option>
            <option>Mongla Port</option>
            <option>Chattogram Port</option>
            <option>Japan Auction</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400">Publication</label>
          <select
            name="publicationStatus"
            defaultValue={vehicle?.publicationStatus ?? "PUBLISHED"}
            className={field}
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400">Price mode</label>
          <select
            name="priceMode"
            defaultValue={vehicle?.priceMode ?? "EXACT"}
            className={field}
          >
            <option value="EXACT">EXACT</option>
            <option value="CALL_FOR_PRICE">CALL_FOR_PRICE</option>
            <option value="UPON_REQUEST">UPON_REQUEST</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400">Price BDT</label>
          <input
            name="priceBdt"
            type="number"
            defaultValue={vehicle?.priceBdt ?? ""}
            className={field}
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Price display</label>
          <input
            name="priceDisplay"
            defaultValue={vehicle?.priceDisplay}
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-slate-400">Cover image URL</label>
          <input
            name="imageUrl"
            defaultValue={vehicle?.imageUrl ?? "/vehicles/harrier.jpg"}
            className={field}
          />
          <p className="text-[11px] text-slate-500 mt-1">
            Demo mode uses public paths like /vehicles/harrier.jpg. With
            Supabase Storage, paste the public object URL after upload.
          </p>
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-slate-400">
            Features (comma-separated)
          </label>
          <textarea
            name="features"
            rows={3}
            defaultValue={vehicle?.features.join(", ")}
            className={field}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={vehicle?.featured ?? true}
          />
          Featured
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="isNegotiable"
            defaultChecked={vehicle?.isNegotiable ?? true}
          />
          Negotiable
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="auctionSheetAvailable"
            defaultChecked={vehicle?.auctionSheetAvailable ?? true}
          />
          Auction sheet available
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-[#D4AF37] disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save vehicle"}
      </button>
    </form>
  );
}
