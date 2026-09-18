import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lohan 29er Season Hub",
    short_name: "29er Hub",
    description: "Cockpit de saison 29er : entraînement, navigation, réglages, objectifs et logistique.",
    start_url: "/lohan-29er-season-hub/",
    display: "standalone",
    background_color: "#071827",
    theme_color: "#071827",
    orientation: "portrait",
    icons: [{ src: "/lohan-29er-season-hub/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }]
  };
}
