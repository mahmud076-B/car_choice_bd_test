"use client";

type HeroVideoProps = {
  src?: string;
};

/** Full-bleed muted looping background — dark until the first frame, no poster image */
export default function HeroVideo({
  src = "/SUV_driving_on_road.mp4",
}: HeroVideoProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]" aria-hidden>
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover blur-[2px] sm:blur-[3px] brightness-[0.65]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
