// Generates /robots.txt. Private pages are blocked, public pages + sitemap are advertised.
import type { MetadataRoute } from "next";
import { env } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/dashboard", "/projects", "/users", "/profile"] }],
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
