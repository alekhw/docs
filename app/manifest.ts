import type { MetadataRoute } from "next";
import { appName } from "@/lib/shared";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appName,
    short_name: "Everstrat.xyz Docs",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111111",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
