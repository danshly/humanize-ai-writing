import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = site.title;
export const size = { width: 1200, height: 630 };
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
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0c0b",
          color: "#e7e5e4",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 110, fontWeight: 700, letterSpacing: -3 }}>
          Don&apos;t AI Me.
        </div>
        <div style={{ fontSize: 38, marginTop: 28, color: "#a8a29e" }}>
          If it was written by AI, make it sound like you.
        </div>
        <div
          style={{
            marginTop: 48,
            width: 240,
            height: 6,
            borderRadius: 3,
            background: "#fbbf24",
          }}
        />
      </div>
    ),
    size,
  );
}
