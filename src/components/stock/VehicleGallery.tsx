"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, FileCheck2, X } from "lucide-react";
import type { VehicleImage } from "@/lib/types";

interface VehicleGalleryProps {
  images: VehicleImage[];
  title: string;
}

export default function VehicleGallery({ images, title }: VehicleGalleryProps) {
  const list = images.length > 0 ? images : [];
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (list.length === 0) {
    return (
      <div className="aspect-[16/10] rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#b0b0b0]">
        No photos available
      </div>
    );
  }

  const current = list[index] ?? list[0];
  const prev = () => setIndex((i) => (i - 1 + list.length) % list.length);
  const next = () => setIndex((i) => (i + 1) % list.length);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-white/10 shadow-sm group">
        <button
          type="button"
          className="absolute inset-0 z-0"
          onClick={() => setLightbox(true)}
          aria-label="Open gallery lightbox"
        >
          <Image
            src={current.url}
            alt={current.alt ?? title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </button>

        {current.isAuctionSheet && (
          <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#070B14]/90 text-[#D4AF37] border border-[#D4AF37]/50">
            <FileCheck2 className="w-3.5 h-3.5" />
            Auction Sheet
          </span>
        )}

        <span className="absolute bottom-4 left-4 z-10 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-black/60 text-slate-200">
          {index + 1} / {list.length} PHOTOS
        </span>

        {list.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden border ${
                i === index
                  ? "border-[#D4AF37]"
                  : "border-white/10 opacity-70 hover:opacity-100"
              }`}
              aria-label={`View photo ${i + 1}`}
            >
              <Image
                src={img.url}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 p-3 rounded-full bg-white/10 text-white"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[16/10]">
            <Image
              src={current.url}
              alt={current.alt ?? title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 p-3 rounded-full bg-white/10 text-white"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
