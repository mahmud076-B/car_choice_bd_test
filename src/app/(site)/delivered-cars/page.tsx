import type { Metadata } from "next";
import Image from "next/image";
import { listDeliveredCars } from "@/lib/delivered";
import StaggerReveal from "@/components/StaggerReveal";

export const metadata: Metadata = {
  title: "Delivered Cars | Car Choice BD",
};

export default async function DeliveredCarsPage() {
  const cars = await listDeliveredCars();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-['Outfit'] text-[#d4af37]">
          Delivered Cars
        </h1>
        <div className="section-rule" />
        <p className="text-sm text-[#b0b0b0] mt-4 max-w-xl mx-auto">
          Happy clients of Car Choice BD — Japanese reconditioned vehicles
          handed over from our Rajshahi showroom.
        </p>
      </div>

      <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <article
            key={car.id}
            className="rounded-xl overflow-hidden border border-white/10 bg-[#0f0f0f]/80 shadow-sm"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={car.imageUrl}
                alt={`${car.title} ${car.modelYear}`}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute bottom-0 left-0 right-0 flex">
                <span className="bg-[#d4af37] text-[#0b1426] text-xs font-semibold px-3 py-1.5 italic">
                  Congratulations!
                </span>
                <span className="bg-black/80 text-white text-xs font-bold px-3 py-1.5 uppercase flex-1">
                  {car.title} {car.modelYear}
                </span>
              </div>
            </div>
            {car.caption && (
              <p className="p-3 text-xs text-[#b0b0b0]">{car.caption}</p>
            )}
          </article>
        ))}
      </StaggerReveal>
    </div>
  );
}
