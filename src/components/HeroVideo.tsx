"use client";

type HeroVideoProps = {
  src?: string;
  poster?: string;
};

/** Full-bleed muted looping SUV showcase — blurred so hero copy stays readable */
export default function HeroVideo({
  src = "/SUV_driving_on_road.mp4",
  poster = "/Cover_Photo.png",
}: HeroVideoProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover blur-[2px] sm:blur-[3px] brightness-[0.65]"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
