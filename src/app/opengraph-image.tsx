import { ImageResponse } from "next/og";

export const alt =
  "Car Choice BD | Japanese Reconditioned Vehicles in Rajshahi, Bangladesh";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.22), transparent 55%), radial-gradient(circle at 15% 85%, rgba(212, 175, 55, 0.12), transparent 50%)",
          padding: "56px 68px",
          border: "2px solid rgba(212, 175, 55, 0.35)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Kicker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(212, 175, 55, 0.12)",
              border: "1px solid rgba(212, 175, 55, 0.45)",
              color: "#d4af37",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            DIRECT JAPANESE AUCTION IMPORTER
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#b0b0b0",
              fontWeight: 600,
            }}
          >
            www.carchoicebd.com
          </div>
        </div>

        {/* Center Brand & Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "18px",
              fontSize: 82,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            <span style={{ color: "#ffffff" }}>CAR</span>
            <span style={{ color: "#d4af37" }}>CHOICE</span>
            <span style={{ color: "#ffffff" }}>BD</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 600,
              color: "#e5e5e5",
              maxWidth: "920px",
              lineHeight: 1.3,
            }}
          >
            Certified Japanese Reconditioned Cars · True Auction Sheet
            Verification · Direct Japan Pre-Order
          </div>
        </div>

        {/* Bottom Showroom Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "26px",
            borderTop: "1px solid rgba(255, 255, 255, 0.14)",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: 15,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#d4af37",
                fontWeight: 700,
              }}
            >
              RAJSHAHI FLAGSHIP SHOWROOM
            </span>
            <span
              style={{
                fontSize: 22,
                color: "#b0b0b0",
                fontWeight: 500,
              }}
            >
              Near BRTA Office, Naodapara, Amchattar, Rajshahi
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: 15,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6ee7a0",
                fontWeight: 700,
              }}
            >
              SALES HOTLINE & WHATSAPP
            </span>
            <span
              style={{
                fontSize: 26,
                color: "#ffffff",
                fontWeight: 800,
              }}
            >
              +880 1838-581250
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

