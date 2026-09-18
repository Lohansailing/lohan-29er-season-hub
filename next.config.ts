import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export",
  basePath: "/lohan-29er-season-hub",
  assetPrefix: "/lohan-29er-season-hub/",
  images: { unoptimized: true },
};

export default nextConfig;
