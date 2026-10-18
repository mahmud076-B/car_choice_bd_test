import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.carchoicebd.com"),
  title: "Car Choice BD | Japanese Reconditioned Car Importer in Rajshahi, Bangladesh",
  description:
    "Car Choice BD is your trusted destination for genuine Japanese reconditioned vehicles in Bangladesh. Explore ready stock, verify genuine Japanese auction sheets, and pre-order directly from Japan.",
  keywords: [
    "Car Choice BD",
    "Japanese Car Importer Bangladesh",
    "Reconditioned Cars Rajshahi",
    "Toyota Harrier Bangladesh",
    "Japanese Auction Sheet Verification",
    "Amchattar BRTA Car Showroom",
  ],
  authors: [{ name: "Car Choice BD" }],
  openGraph: {
    title: "Car Choice BD | Japanese Reconditioned Vehicles",
    description:
      "Certified quality, authentic Japanese auction grades, and direct imports delivered to Rajshahi and throughout Bangladesh.",
    url: "https://www.carchoicebd.com",
    siteName: "Car Choice BD",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "Car Choice BD",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body
        className="min-h-screen bg-[#050505] text-white antialiased selection:bg-[#d4af37]/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
