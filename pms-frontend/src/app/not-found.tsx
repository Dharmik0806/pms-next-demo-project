// 404 page. Sends the right "404" status code automatically.
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="text-6xl font-semibold tracking-tight text-primary">404</p>
      <h1 className="text-xl font-semibold">This page doesn’t exist</h1>
      <p className="max-w-sm text-sm text-muted-foreground">The link may be broken or the page may have been moved.</p>
      <Button asChild className="mt-2"><Link href={ROUTES.home}>Back to home</Link></Button>
    </main>
  );
}
