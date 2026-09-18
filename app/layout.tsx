import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DataProvider } from "@/components/data-provider";
import { AppShell } from "@/components/app-shell";
import { ServiceWorkerRegister } from "@/components/service-worker-register";

export const metadata: Metadata = {
  title: { default: "29er Season Hub", template: "%s · 29er Season Hub" },
  description: "Cockpit mobile-first de la saison 29er de Lohan.",
  applicationName: "29er Season Hub",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "29er Hub" }
};
export const viewport: Viewport = { themeColor: "#071827", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body><DataProvider><ServiceWorkerRegister /><AppShell>{children}</AppShell></DataProvider></body></html>;
}
