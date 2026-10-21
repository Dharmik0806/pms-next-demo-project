// Generates /manifest.webmanifest so the site can be installed as an app.
import type { MetadataRoute } from "next";
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/constants/app.constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${APP_NAME} – ${APP_TAGLINE}`,
    short_name: APP_NAME,
    description: APP_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2f55d4",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
