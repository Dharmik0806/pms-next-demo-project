// Public landing page ("/"). It is a Server Component, so all the HTML is
// rendered on the server – great for SEO and fast first paint.
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BarChart3, FolderKanban, Shield } from "@/icons";
import { APP_NAME } from "@/constants/app.constants";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: { absolute: "PMS – Simple project management for small teams" },
  description: "Create projects, set priorities and due dates, add your team and see progress at a glance. Free and easy to set up.",
  alternates: { canonical: "/" },
};

// Content for the three feature blocks
const FEATURES = [
  { icon: FolderKanban, title: "Projects in one place", text: "Give every project a status, priority, due date and progress bar. Search and filter in seconds." },
  { icon: Shield, title: "Roles that fit your team", text: "Admins manage people, managers run projects and members see only what they’re part of." },
  { icon: BarChart3, title: "A dashboard that answers “what’s late?”", text: "See totals, overdue work and a status breakdown the moment you log in." },
];

// Fake rows for the preview card in the hero
const PREVIEW = [
  { name: "Website redesign", status: "Active", tone: "bg-blue-500/10 text-blue-300", progress: 65 },
  { name: "Mobile app v2", status: "Planning", tone: "bg-slate-400/10 text-slate-300", progress: 10 },
  { name: "Billing migration", status: "On hold", tone: "bg-amber-500/10 text-amber-300", progress: 40 },
  { name: "Onboarding docs", status: "Completed", tone: "bg-emerald-500/10 text-emerald-300", progress: 100 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ---------- Top navigation ---------- */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href={ROUTES.home} className="flex items-center gap-2.5 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">P</span>
            {APP_NAME}
          </Link>
          <nav aria-label="Account" className="flex items-center gap-2">
            <Button asChild variant="ghost"><Link href={ROUTES.login}>Log in</Link></Button>
            <Button asChild><Link href={ROUTES.register}>Get started</Link></Button>
          </nav>
        </div>
      </header>

      <main id="main-content">
        {/* ---------- Hero ---------- */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            {/* Only ONE <h1> per page – important for SEO */}
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Know where every project stands.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              PMS keeps your projects, deadlines and teammates together, so nothing slips and nobody has to ask for an update.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link href={ROUTES.register}>Create your account <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href={ROUTES.login}>Log in</Link></Button>
            </div>
          </div>

          {/* Static preview of the product (decorative, hidden from screen readers) */}
          <div aria-hidden className="rounded-2xl bg-sidebar p-5 text-sidebar-foreground shadow-2xl ring-1 ring-black/10">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium">Projects</span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs">4 total · 1 overdue</span>
            </div>
            <div className="space-y-3">
              {PREVIEW.map((p) => (
                <div key={p.name} className="rounded-lg bg-white/5 p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium">{p.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${p.tone}`}>{p.status}</span>
                  </div>
                  <Progress value={p.progress} className="mt-3 bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section aria-labelledby="features-title" className="border-t bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 id="features-title" className="max-w-xl text-2xl font-semibold tracking-tight">Everything a small team needs, nothing it doesn’t</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-5" /></div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground sm:px-6">© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</div>
      </footer>
    </div>
  );
}
