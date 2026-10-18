"use client";

const brands = [
  { name: "Toyota", src: "/brands/toyota.svg" },
  { name: "Honda", src: "/brands/honda.svg" },
  { name: "Nissan", src: "/brands/nissan.svg" },
  { name: "Mitsubishi", src: "/brands/mitsubishi.svg" },
  { name: "Lexus", src: "/brands/lexus.png" },
  { name: "Mazda", src: "/brands/mazda.svg" },
  { name: "Subaru", src: "/brands/subaru.svg" },
  { name: "Suzuki", src: "/brands/suzuki.svg" },
];

function BrandItem({ name, src }: { name: string; src: string }) {
  const isSvg = src.endsWith(".svg");
  return (
    <div
      className="flex items-center justify-center shrink-0 px-8 sm:px-12 h-14 sm:h-16"
      title={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} logo`}
        className={`h-8 sm:h-10 w-auto max-w-[120px] object-contain opacity-75 hover:opacity-100 transition-opacity duration-300 ${
          isSvg ? "brightness-0 invert" : ""
        }`}
        loading="lazy"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = "none";
          const fallback = el.nextElementSibling as HTMLElement | null;
          if (fallback) fallback.classList.remove("hidden");
        }}
      />
      <span className="hidden text-xs sm:text-sm font-bold uppercase tracking-wider text-white/50">
        {name}
      </span>
    </div>
  );
}

/** Infinite horizontal logo slideshow — brands sold by Car Choice BD */
export default function BrandMarquee() {
  const loop = [...brands, ...brands];

  return (
    <section
      className="border-y border-white/10 py-5 sm:py-6 bg-[#0a0a0a] overflow-hidden"
      aria-label="Japanese car brands we import"
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

        <div className="brand-marquee-track flex w-max items-center">
          {loop.map((b, i) => (
            <BrandItem key={`${b.name}-${i}`} name={b.name} src={b.src} />
          ))}
        </div>
      </div>
    </section>
  );
}
