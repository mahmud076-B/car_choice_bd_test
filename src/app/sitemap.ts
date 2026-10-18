import type { MetadataRoute } from "next";
import { listPublishedVehicles } from "@/lib/vehicles";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehicles = await listPublishedVehicles();
  const base = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

  const staticRoutes = [
    "",
    "/stock",
    "/pre-order",
    "/verify-auction-sheet",
    "/delivered-cars",
    "/how-to-buy",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" || path === "/stock" ? 1 : 0.7,
  }));

  const vehicleRoutes = vehicles.map((v) => ({
    url: `${base}/stock/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...vehicleRoutes];
}
