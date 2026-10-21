// One place to read environment variables.
// Only NEXT_PUBLIC_* values are available in the browser.
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",
};
