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
          background: "#285447",
          color: "#faf9f6",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 4,
          borderRadius: 14,
          border: "1px solid #285447",
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
