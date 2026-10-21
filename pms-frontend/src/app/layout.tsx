// Root layout: wraps EVERY page. Holds fonts, global SEO metadata and providers.
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "./providers";
import { env } from "@/config/env";
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE, THEME_KEY } from "@/constants/app.constants";

// ---------- SEO: default metadata (pages can override any field) ----------
export const metadata: Metadata = {
  // Needed so relative URLs (og images, canonical) become absolute
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${APP_NAME} – ${APP_TAGLINE}`,
    template: `%s | ${APP_NAME}`, // "Projects | PMS"
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: ["project management", "task tracking", "team collaboration", "project dashboard", "PMS"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: `${APP_NAME} – ${APP_TAGLINE}`,
    description: APP_DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${APP_NAME} – ${APP_TAGLINE}`, description: APP_DESCRIPTION },
  robots: { index: true, follow: true },
};

// Browser UI colour + responsive scaling
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1320" },
  ],
};

// ---------- SEO: structured data (JSON-LD) helps Google understand the site ----------
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: env.siteUrl,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

// Runs before the page paints so the saved theme is applied with no white flash
const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the theme script changes <html> class before React loads
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">
        {/* Accessibility: lets keyboard users jump past the navigation */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
