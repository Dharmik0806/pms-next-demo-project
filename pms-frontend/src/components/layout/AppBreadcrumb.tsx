"use client";
// Shows "Home / Projects" based on the current URL.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "@/icons";
import { ROUTES } from "@/constants/routes";

// Human names for each URL segment
const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Projects",
  users: "Users",
  profile: "Profile",
};

export function AppBreadcrumb() {
  const segments = usePathname().split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link href={ROUTES.dashboard} className="hover:text-foreground">Home</Link>
      {segments.map((seg, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        return (
          <span key={href} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" />
            {isLast ? (
              <span aria-current="page" className="font-medium text-foreground">{LABELS[seg] ?? seg}</span>
            ) : (
              <Link href={href} className="hover:text-foreground">{LABELS[seg] ?? seg}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
