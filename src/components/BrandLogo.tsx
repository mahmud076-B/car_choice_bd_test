import Link from "next/link";

type BrandLogoProps = {
  /** Visual height in px (width scales with asset aspect) */
  height?: number;
  className?: string;
  /** Link to home when true */
  link?: boolean;
  priority?: boolean;
};

/**
 * Official transparent SVG logo — prefer this over Profile_Pic_Logo.jpeg / Cover_Photo.png.
 */
export default function BrandLogo({
  height = 44,
  className = "",
  link = true,
  priority = false,
}: BrandLogoProps) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt="Car Choice BD"
      height={height}
      width={Math.round(height * (1440 / 810))}
      className={`h-auto w-auto object-contain object-left ${className}`}
      style={{ height, maxWidth: "100%" }}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
    />
  );

  if (!link) return img;

  return (
    <Link href="/" className="inline-flex items-center shrink-0" aria-label="Car Choice BD home">
      {img}
    </Link>
  );
}
