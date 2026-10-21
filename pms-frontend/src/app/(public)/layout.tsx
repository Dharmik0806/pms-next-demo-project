// Layout for /login and /register: brand panel on the left, form on the right.
import Link from "next/link";
import { PublicGuard } from "./public-guard";
import { APP_NAME } from "@/constants/app.constants";
import { ROUTES } from "@/constants/routes";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicGuard>
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
        {/* Brand panel – hidden on small screens */}
        <aside className="hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex">
          <Link href={ROUTES.home} className="flex items-center gap-2.5 font-semibold">
            <span className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary font-bold text-sidebar-primary-foreground">P</span>
            {APP_NAME}
          </Link>
          <div>
            <p className="max-w-md text-3xl font-semibold tracking-tight text-balance">Plan it. Track it. Ship it.</p>
            <p className="mt-4 max-w-md text-sidebar-foreground/70">Projects, deadlines and teammates in one calm workspace.</p>
          </div>
          <p className="text-sm text-sidebar-foreground/50">© {new Date().getFullYear()} {APP_NAME}</p>
        </aside>

        <main id="main-content" className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm">
            {/* Logo for small screens (the brand panel is hidden there) */}
            <Link href={ROUTES.home} className="mb-10 flex items-center gap-2.5 font-semibold lg:hidden">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">P</span>
              {APP_NAME}
            </Link>
            {children}
          </div>
        </main>
      </div>
    </PublicGuard>
  );
}
