import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MessageSquare,
  Phone,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  MapPin,
} from "lucide-react";
import VehicleGallery from "@/components/stock/VehicleGallery";
import { getVehicleBySlug, listPublishedVehicles } from "@/lib/vehicles";
import { vehicleWhatsAppUrl } from "@/lib/whatsapp";
import {
  HOTLINE_DISPLAY,
  HOTLINE_TEL,
  SITE_URL,
} from "@/lib/constants";

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
    description: `${vehicle.package} · Grade ${vehicle.grade} · ${vehicle.mileage.toLocaleString("en-IN")} km · Available at Car Choice BD Rajshahi`,
    openGraph: { images: [{ url: vehicle.imageUrl }] },
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return notFound();

  const whatsappUrl = vehicleWhatsAppUrl(vehicle);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.package}`,
    brand: { "@type": "Brand", name: vehicle.make },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    fuelType: vehicle.fuelType,
    color: vehicle.color,
    url: `${SITE_URL}/stock/${vehicle.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      ...(vehicle.priceBdt ? { price: vehicle.priceBdt } : {}),
      availability:
        vehicle.status === "SOLD"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
    },
  };

  return (
    <div className="bg-[#050505] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
          <Link
            href="/stock"
            className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#d4af37] hover:underline"
          >
            ← Back to Live Stock
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#b0b0b0]">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            {vehicle.location}
          </span>
        </div>

        <div className="pb-6 border-b border-white/10">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#d4af37] font-semibold">
            {vehicle.make} · {vehicle.bodyType}
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit'] text-white mt-1">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <p className="text-sm sm:text-base text-[#b0b0b0] mt-1.5">
            {vehicle.package} · Chassis{" "}
            <span className="font-mono text-white">
              {vehicle.chassisPrefix}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left Column: Gallery + Features */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative">
              <VehicleGallery
                images={vehicle.images}
                title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              />
              <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#25d366]/15 text-[#6ee7a0] border border-[#25d366]/40 backdrop-blur-md">
                  {vehicle.statusLabel}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-black/75 text-[#d4af37] border border-[#d4af37]/45 backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Grade {vehicle.grade}
                </span>
              </div>
            </div>

            {vehicle.features.length > 0 && (
              <div className="glass-card p-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#d4af37] font-semibold mb-1">
                  Equipment
                </p>
                <h2 className="text-lg font-bold text-white font-['Outfit'] mb-4">
                  Highlighted Vehicle Features
                </h2>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/90">
                  {vehicle.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#161616]/80 border border-white/10"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Showroom Pricing & Specs */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-7 lg:sticky lg:top-24 space-y-6">
              {/* Price Display Box */}
              <div className="rounded-2xl border border-[#d4af37]/35 bg-[#d4af37]/10 p-5 text-center">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold">
                  {vehicle.priceMode === "EXACT"
                    ? "Showroom Price"
                    : "Showroom Pricing"}
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1.5">
                  {vehicle.priceDisplay}
                </p>
                {vehicle.isNegotiable && (
                  <p className="text-xs text-[#b0b0b0] mt-1">
                    Negotiable upon showroom inspection
                  </p>
                )}
              </div>

              {/* Direct Conversion CTAs */}
              <div className="space-y-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full btn-whatsapp font-bold text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Ask on WhatsApp (With Car Details)
                </a>

                <a
                  href={`tel:${HOTLINE_TEL}`}
                  className="btn-ghost w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold"
                >
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  Call Showroom: {HOTLINE_DISPLAY}
                </a>

                {vehicle.chassisPrefix && (
                  <Link
                    href={`/verify-auction-sheet?chassis=${encodeURIComponent(
                      vehicle.chassisPrefix
                    )}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold text-[#d4af37] border border-[#d4af37]/30 bg-[#d4af37]/5 hover:bg-[#d4af37]/15 transition-colors"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    Verify Japanese Auction Sheet ({vehicle.chassisPrefix})
                  </Link>
                )}
              </div>

              {/* Specification Table */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
                  Japanese Specification Sheet
                </p>
                <dl className="text-sm divide-y divide-white/10">
                  {[
                    ["Chassis Code", vehicle.chassisPrefix],
                    ["Model Year", String(vehicle.year)],
                    ["Package / Trim", vehicle.package || "Standard"],
                    ["Auction Grade", vehicle.grade],
                    [
                      "Verified Mileage",
                      `${vehicle.mileage.toLocaleString("en-IN")} km`,
                    ],
                    [
                      "Engine CC",
                      vehicle.engineCc ? `${vehicle.engineCc} cc` : "—",
                    ],
                    ["Fuel Type", vehicle.fuelType],
                    ["Transmission", vehicle.transmission || "Automatic"],
                    ["Drive", vehicle.drive],
                    ["Exterior Color", vehicle.color],
                    ["Current Location", vehicle.location],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-4 py-2.5"
                    >
                      <dt className="text-[#b0b0b0] uppercase text-[11px] tracking-wider">
                        {label}
                      </dt>
                      <dd className="font-semibold text-white text-right">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <Link
                href="/stock"
                className="block text-center text-xs text-[#d4af37] font-semibold hover:underline pt-1"
              >
                Browse More Ready & Port Stock →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
