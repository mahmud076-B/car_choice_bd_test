import Image from "next/image";
import Link from "next/link";
import {
  Car,
  FileCheck2,
  Globe2,
  Award,
  BookOpen,
  Building2,
  ArrowRight,
} from "lucide-react";
import { listPublishedVehicles } from "@/lib/vehicles";
import { listDeliveredCars } from "@/lib/delivered";
import {
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_URL,
  HOTLINE_DISPLAY,
  HOTLINE_TEL,
  SHOWROOM_ADDRESS,
} from "@/lib/constants";
import VehicleCard from "@/components/VehicleCard";
import BrandMarquee from "@/components/BrandMarquee";
import HeroVideo from "@/components/HeroVideo";
import ShowroomMap from "@/components/ShowroomMap";
import StaggerReveal from "@/components/StaggerReveal";

const portals = [
  {
    href: "/stock",
    title: "Check Live Stock",
    desc: "Ready & port inventory",
    icon: Car,
  },
  {
    href: "/verify-auction-sheet",
    title: "Verify Now",
    desc: "Auction sheet by chassis",
    icon: FileCheck2,
  },
  {
    href: "/pre-order",
    title: "Pre-Order Japan",
    desc: "Source from auction",
    icon: Globe2,
  },
  {
    href: "/delivered-cars",
    title: "Delivered Cars",
    desc: "Happy customers",
    icon: Award,
  },
  {
    href: "/how-to-buy",
    title: "How to Buy",
    desc: "Import guidance",
    icon: BookOpen,
  },
  {
    href: "/contact",
    title: "Visit Showroom",
    desc: "Rajshahi · BRTA",
    icon: Building2,
  },
];

export default async function HomePage() {
  const [stock, deliveredCars] = await Promise.all([
    listPublishedVehicles(),
    listDeliveredCars(),
  ]);
  const featured = stock.filter((v) => v.featured).slice(0, 6);
  const deliveredShowcase = deliveredCars.slice(0, 4);

  return (
    <div className="bg-[#050505]">
      {/* Cinematic hero — blurred SUV video + strong overlay for readable copy */}
      <section className="relative min-h-[calc(100svh-68px)] sm:min-h-[88vh] flex items-center overflow-hidden text-white">
        <HeroVideo src="/SUV_driving_on_road.mp4" />
        <div
          className="absolute inset-0 z-[1] bg-black/35"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/50 to-black/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-black/35"
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-24">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.32em] text-[#d4af37] mb-5 sm:mb-4 font-semibold drop-shadow-md">
            Japanese Automotive Excellence
          </p>
          <h1 className="text-[1.85rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.18] sm:leading-[1.08] drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
            Driven by Trust.
            <span className="mt-2 sm:mt-1 block">Defined by Quality.</span>
          </h1>
          <p className="hero-accent mt-6 sm:mt-4 text-[1.35rem] sm:text-3xl md:text-4xl font-extrabold tracking-tight" aria-hidden="true">
            <span className="hero-slot" aria-hidden="true">
              <span className="hero-word">Ready Stock</span>
              <span className="hero-word">Pre-Order</span>
              <span className="hero-word">Auction Grade</span>
              <span className="hero-word">Delivered</span>
            </span>
          </p>
          <p className="mt-7 sm:mt-6 max-w-[36ch] sm:max-w-lg text-[15px] sm:text-lg font-normal leading-[1.75] tracking-[0.01em] text-white/75 drop-shadow-md">
            Discover carefully sourced Japanese vehicles with a commitment to
            quality, transparency, and a better ownership experience.
          </p>
          <div className="mt-8 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              href="/stock"
              className="btn-primary inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] sm:text-sm"
            >
              Explore Available Cars
              <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/contact"
              className="btn-ghost inline-flex items-center justify-center px-4 py-2.5 rounded-full text-[13px] sm:text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <BrandMarquee />

      {/* Portals */}
      <section className="py-16 max-w-7xl mx-auto px-4 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
          Explore
        </p>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Buy Your Dream Car From Us
        </h2>
        <p className="mt-2 text-sm text-white/45 uppercase tracking-wider">
          Pre Order | Ready Stock | Wholesale | Retail
        </p>
        <div className="section-rule" />

        <StaggerReveal className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {portals.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#d4af37]/40 hover:bg-white/[0.06] transition-all"
            >
              <div className="mx-auto w-11 h-11 rounded-full border border-[#d4af37]/25 text-[#d4af37] flex items-center justify-center mb-3 group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">{p.title}</h3>
              <p className="text-[11px] text-white/40 mt-1">{p.desc}</p>
            </Link>
          ))}
        </StaggerReveal>
      </section>

      {/* Delivered — showcase first for social proof */}
      <section className="py-14 border-y border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-2">
              Happy Customers
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Delivered Cars
            </h2>
            <div className="section-rule" />
          </div>
          <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {deliveredShowcase.map((car) => (
              <Link
                key={car.id}
                href="/delivered-cars"
                className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group"
              >
                <Image
                  src={car.imageUrl}
                  alt={car.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <p className="text-xs font-bold">{car.title}</p>
                  <p className="text-[10px] text-white/60">{car.modelYear}</p>
                </div>
              </Link>
            ))}
          </StaggerReveal>
          <div className="text-center mt-7">
            <Link
              href="/delivered-cars"
              className="text-sm font-semibold text-[#d4af37] hover:underline"
            >
              View all delivered cars →
            </Link>
          </div>
        </div>
      </section>

      {/* About — clean split, no glass card */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <StaggerReveal className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-[#111]">
            <Image
              src="/Cover_Photo.png"
              alt="Car Choice BD showroom"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
              About Us
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Drive Excellence
            </h2>
            <div className="w-12 h-px bg-[#d4af37]/70 mt-4 mb-5" />
            <p className="text-sm text-white/55 leading-relaxed">
              We import high-quality Japanese reconditioned vehicles to
              Bangladesh with authentic auction sheets for full transparency.
              Showroom near BRTA Office, Amchattar, Rajshahi — convenient for
              registration.
            </p>
            <Link
              href="/about"
              className="inline-flex mt-7 text-sm font-bold text-[#d4af37] hover:underline"
            >
              Read More →
            </Link>
          </div>
        </StaggerReveal>
      </section>

      {/* Featured stock */}
      <section className="py-14 border-t border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-2">
                Live Inventory
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Available Vehicles
              </h2>
              <p className="text-sm text-white/45 mt-1">
                Rajshahi showroom & port stock
              </p>
            </div>
            <Link
              href="/stock"
              className="text-sm font-semibold text-[#d4af37] hover:underline inline-flex items-center gap-1 shrink-0"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Showroom Location & Live Map */}
      <section className="py-16 border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
              Flagship Showroom · Rajshahi
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Visit Our Showroom
            </h2>
            <div className="w-12 h-px bg-[#d4af37]/70" />
            <p className="text-sm text-[#b0b0b0] leading-relaxed">
              {SHOWROOM_ADDRESS}
            </p>
            <p className="text-xs text-white/60">
              Open Everyday: 10:00 AM – 8:00 PM · Hotline:{" "}
              <a
                href={`tel:${HOTLINE_TEL}`}
                className="text-[#d4af37] font-semibold hover:underline"
              >
                {HOTLINE_DISPLAY}
              </a>
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-5 py-3 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-2"
              >
                Get Directions ↗
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-5 py-3 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2"
              >
                Open in Google Maps
              </a>
              <Link
                href="/contact"
                className="text-xs sm:text-sm font-semibold text-[#d4af37] hover:underline px-2 py-2"
              >
                Contact Us →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ShowroomMap heightClass="h-[300px] sm:h-[360px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
