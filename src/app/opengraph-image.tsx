import { ImageResponse } from "next/og";
import { identity } from "@/lib/content";

export const runtime = "edge";
export const alt = identity.fullName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #08080d 0%, #0d0d18 45%, #131022 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8b9cff",
            marginBottom: 24,
          }}
        >
          Portfolio
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
          {identity.fullName}
        </div>
        <div style={{ fontSize: 34, marginTop: 24, color: "#c7cbe0" }}>
          {identity.title}
        </div>
        <div style={{ fontSize: 26, marginTop: 12, color: "#9295b3" }}>
          {identity.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
