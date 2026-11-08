import { MapPin, Navigation, ExternalLink } from "lucide-react";
import {
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_URL,
  SHOWROOM_ADDRESS,
} from "@/lib/constants";

interface ShowroomMapProps {
  heightClass?: string;
}

export default function ShowroomMap({
  heightClass = "h-[340px] sm:h-[400px]",
}: ShowroomMapProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#d4af37]/30 bg-[#0f0f0f] shadow-[0_20px_50px_rgba(0,0,0,0.75)]">
      {/* Top Bar */}
      <div className="px-5 py-3.5 bg-[#121212] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-8 h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold">
              Flagship Showroom Pin
            </p>
            <p className="text-xs sm:text-sm font-bold text-white truncate">
              CAR CHOICE BD · Amchattar, Rajshahi
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={GOOGLE_MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-3.5 py-2 rounded-full text-xs font-bold inline-flex items-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            Get Directions
          </a>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-3.5 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-1.5"
          >
            Open in Google Maps
            <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
          </a>
        </div>
      </div>

      {/* Live Google Maps Embed */}
      <div className={`relative w-full ${heightClass} bg-[#0a0a0a]`}>
        <iframe
          title="Car Choice BD Rajshahi Showroom Map"
          src={GOOGLE_MAPS_EMBED_URL}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      {/* Bottom Address Strip */}
      <div className="px-5 py-3 bg-[#0f0f0f] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#b0b0b0]">
        <span>{SHOWROOM_ADDRESS}</span>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#d4af37] font-semibold hover:underline shrink-0"
        >
          maps.app.goo.gl/9k3LfU4sADka67L47 ↗
        </a>
      </div>
    </div>
  );
}

