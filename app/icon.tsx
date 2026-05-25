import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, rgba(235,240,255,0.28), transparent 45%), linear-gradient(180deg, #0b0d12 0%, #040507 100%)",
          color: "#f6f7fb",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 4,
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        DK
      </div>
    ),
    {
      ...size,
    },
  );
}
