// Generates /sitemap.xml with the public pages only.
import type { MetadataRoute } from "next";
import { env } from "@/config/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: env.siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${env.siteUrl}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${env.siteUrl}/register`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
