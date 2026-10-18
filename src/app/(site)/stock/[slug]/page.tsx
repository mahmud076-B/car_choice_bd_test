import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageSquare, Phone, CheckCircle2, ShieldCheck } from "lucide-react";
import VehicleGallery from "@/components/stock/VehicleGallery";
import { getVehicleBySlug, listPublishedVehicles } from "@/lib/vehicles";
import { vehicleWhatsAppUrl } from "@/lib/whatsapp";
import { HOTLINE_DISPLAY, HOTLINE_TEL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const vehicles = await listPublishedVehicles();
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle Not Found | Car Choice BD" };
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} | Car Choice BD`,
    description: `${vehicle.package} · Grade ${vehicle.grade} · ${vehicle.mileage.toLocaleString()} km`,
    openGraph: { images: [{ url: vehicle.imageUrl }] },
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return notFound();

  const whatsappUrl = vehicleWhatsAppUrl(vehicle);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <Link
        href="/stock"
        className="inline-flex items-center text-sm font-semibold text-[#d4af37] hover:underline mb-4"
      >
        ← Back to Live Stock
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#1e3a5f]">
        {vehicle.make} {vehicle.model}
      </h1>
      <p className="text-[#5a6577] mt-1">
        {vehicle.package} — {vehicle.year}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="relative">
            <VehicleGallery
              images={vehicle.images}
              title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            />
            <div className="absolute top-3 left-3 z-20 flex gap-2 pointer-events-none">
              <span className="px-3 py-1 rounded text-xs font-bold uppercase bg-[#25d366]/15 text-[#6ee7a0] border border-[#25d366]/35">
                {vehicle.statusLabel}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded text-xs font-bold bg-white text-[#d4af37] border border-[#d4af37]/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                Grade {vehicle.grade}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#dde3eb]">
            <h3 className="font-bold text-[#1e3a5f] font-['Outfit'] mb-3">
              Features
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-[#1a2332]">
              {vehicle.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  {feat}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="p-6 rounded-xl bg-white border border-[#dde3eb] shadow-sm lg:sticky lg:top-28 space-y-5">
            <div className="rounded-lg bg-[#1e3a5f] text-white p-4">
              <p className="text-xs uppercase tracking-wider text-white/70">
                Need pricing or availability?
              </p>
              <h3 className="font-bold mt-1">Talk to the sales team directly.</h3>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 py-3 rounded-md btn-whatsapp font-bold text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Ask on Whatsapp
              </a>
            </div>

            <div className="text-center">
              <p className="text-xs uppercase text-[#5a6577]">
                {vehicle.priceMode === "EXACT" ? "Listed price" : "Pricing"}
              </p>
              <p className="text-2xl font-extrabold text-[#1e3a5f] font-mono mt-1">
                {vehicle.priceDisplay}
              </p>
            </div>

            <dl className="text-sm space-y-2 border-t border-[#dde3eb] pt-4">
              {[
                ["Chassis", vehicle.chassisPrefix],
                ["Year", String(vehicle.year)],
                ["Color", vehicle.color],
                ["Mileage", `${vehicle.mileage.toLocaleString()} km`],
                ["Fuel Type", vehicle.fuelType],
                ["Auction Point", vehicle.grade],
                ["Location", vehicle.location],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 py-1.5 border-b border-[#eef2f6]"
                >
                  <dt className="text-[#5a6577] uppercase text-[11px] tracking-wide">
                    {label}
                  </dt>
                  <dd className="font-semibold text-[#1a2332] text-right">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={`tel:${HOTLINE_TEL}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-md border border-[#dde3eb] text-sm font-semibold text-[#1a2332] hover:border-[#d4af37]"
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              Call {HOTLINE_DISPLAY}
            </a>

            <Link
              href="/stock"
              className="block text-center text-sm text-[#d4af37] font-semibold hover:underline"
            >
              Browse More Cars
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
