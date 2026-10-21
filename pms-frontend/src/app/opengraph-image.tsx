// Generates the social-share preview image (Open Graph) at build time.
import { ImageResponse } from "next/og";
import { APP_NAME, APP_TAGLINE } from "@/constants/app.constants";

export const alt = `${APP_NAME} – ${APP_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#141a33", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 88, height: 88, borderRadius: 20, background: "#2f55d4", fontSize: 52, fontWeight: 700 }}>P</div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 40 }}>Plan it. Track it. Ship it.</div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 20, color: "#aab4e6" }}>{APP_NAME} · {APP_TAGLINE}</div>
      </div>
    ),
    size
  );
}
