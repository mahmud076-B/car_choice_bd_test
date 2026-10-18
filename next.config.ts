import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone / LAN access in `next dev` (IP hostname ≠ localhost)
  allowedDevOrigins: [
    "192.168.1.103",
    "127.0.0.1",
    "localhost",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
