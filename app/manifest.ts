import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lohan 29er Season Hub",
    short_name: "29er Hub",
    description: "Cockpit de saison 29er : entraînement, navigation, réglages, objectifs et logistique.",
    start_url: "/",
    display: "standalone",
    background_color: "#071827",
    theme_color: "#071827",
    orientation: "portrait",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }]
  };
}
