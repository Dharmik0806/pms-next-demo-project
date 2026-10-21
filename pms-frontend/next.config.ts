// Next.js configuration (Next 16 uses Turbopack by default for dev and build).
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Hide the "X-Powered-By: Next.js" header (small security + SEO hygiene win)
  poweredByHeader: false,
  // Allow avatar images from any https host (users paste their own avatar URL)
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
