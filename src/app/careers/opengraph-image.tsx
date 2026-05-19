import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Volunteer Roles | Vendorspot";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#8A38F5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: -120, right: -120,
          width: 480, height: 480, borderRadius: "50%",
          background: "rgba(255,255,255,0.07)", display: "flex",
        }} />
        <div style={{
          position: "absolute", bottom: -100, left: -100,
          width: 360, height: 360, borderRadius: "50%",
          background: "rgba(255,255,255,0.05)", display: "flex",
        }} />

        {/* VS badge */}
        <div style={{
          width: 96, height: 96, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 40, fontWeight: 900, color: "white",
          marginBottom: 28,
          border: "2px solid rgba(255,255,255,0.25)",
        }}>
          VS
        </div>

        {/* Vendorspot wordmark */}
        <div style={{
          fontSize: 64, fontWeight: 800, color: "white",
          marginBottom: 12, letterSpacing: "-1.5px",
        }}>
          Vendorspot
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 30, color: "rgba(255,255,255,0.65)",
          fontWeight: 500, marginBottom: 40,
        }}>
          Volunteer with us
        </div>

        {/* Pill tags */}
        <div style={{ display: "flex", gap: 16 }}>
          {["Remote", "Marketing", "Growth"].map((tag) => (
            <div key={tag} style={{
              background: "rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.85)",
              fontSize: 18, fontWeight: 600,
              padding: "8px 22px", borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          position: "absolute", bottom: 36,
          fontSize: 18, color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.5px",
        }}>
          vendorspotng.com/careers
        </div>
      </div>
    ),
    { ...size }
  );
}
