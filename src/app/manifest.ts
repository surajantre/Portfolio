import type { MetadataRoute } from "next";
import { identity } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${identity.fullName} — Portfolio`,
    short_name: "Suraj Antre",
    description: `${identity.title} — ${identity.tagline}`,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#3b82f6",
    icons: [
      { src: "/favicon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
