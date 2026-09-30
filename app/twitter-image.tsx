import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const alt = "Dylan Knapp — developer and founder";
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
          background: "#faf9f6",
          color: "#202522",
          padding: "68px",
          fontFamily: "Inter, sans-serif",
          borderTop: "14px solid #285447",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#285447",
          }}
        >
          Dylan Knapp
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
            I build apps and digital products.
          </div>
          <div style={{ fontSize: 30, color: "#5f6863" }}>
            RepQuest · Quoia
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
