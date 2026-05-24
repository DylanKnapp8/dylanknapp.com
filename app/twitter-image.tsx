import { ImageResponse } from "next/og";
export const alt = "Dylan B. Knapp - Founder of RepQuest | App Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(180deg, #0b0b0b 0%, #050505 100%)",
          color: "#f5f5f5",
          padding: "68px",
          fontFamily: "Inter, sans-serif",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Dylan B. Knapp
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 70,
              lineHeight: 1.04,
              fontWeight: 700,
              maxWidth: 980,
            }}
          >
            Founder of RepQuest | App Developer | Student Entrepreneur
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.72)" }}>
            Building apps, websites, and digital products with a focus on real users.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
