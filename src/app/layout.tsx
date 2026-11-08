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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Choice BD | Japanese Reconditioned Vehicles",
    description:
      "Certified quality, authentic Japanese auction grades, and direct imports delivered to Rajshahi and throughout Bangladesh.",
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
  const stripExtensionAttrsScript = `(function(){try{var ATTRS=["bis_skin_checked","bis_register","__processed_"];var origSet=Element.prototype.setAttribute;Element.prototype.setAttribute=function(name,val){if(ATTRS.some(function(a){return name===a||name.indexOf(a)===0;}))return;return origSet.call(this,name,val);};function clean(root){if(!root||!root.querySelectorAll)return;var els=root.querySelectorAll("[bis_skin_checked],[bis_register]");for(var i=0;i<els.length;i++){els[i].removeAttribute("bis_skin_checked");els[i].removeAttribute("bis_register");}}clean(document.documentElement);var obs=new MutationObserver(function(muts){for(var i=0;i<muts.length;i++){var m=muts[i];if(m.type==="attributes"&&m.attributeName&&(m.attributeName==="bis_skin_checked"||m.attributeName==="bis_register")){m.target.removeAttribute(m.attributeName);}else if(m.type==="childList"){for(var j=0;j<m.addedNodes.length;j++){var n=m.addedNodes[j];if(n&&n.nodeType===1){n.removeAttribute("bis_skin_checked");n.removeAttribute("bis_register");clean(n);}}}}});obs.observe(document.documentElement,{attributes:true,childList:true,subtree:true,attributeFilter:["bis_skin_checked","bis_register"]});window.addEventListener("load",function(){clean(document.documentElement);setTimeout(function(){obs.disconnect();},4000);},{once:true});}catch(e){}})();`;

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: stripExtensionAttrsScript }}
        />
      </head>
      <body
        className="min-h-screen bg-[#050505] text-white antialiased selection:bg-[#d4af37]/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
