"use client";
// Left navigation. Dark navy in both themes so it anchors the layout.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, LayoutDashboard, User, Users, X } from "@/icons";
import { APP_NAME, APP_TAGLINE } from "@/constants/app.constants";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const NAV = [
  { href: ROUTES.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.projects, label: "Projects", icon: FolderKanban },
  { href: ROUTES.users, label: "Users", icon: Users },
  { href: ROUTES.profile, label: "Profile", icon: User },
];

interface Props {
  open: boolean; // mobile drawer state
  onClose: () => void;
}

export function AppSidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Dark backdrop behind the drawer on small screens */}
      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={onClose} aria-hidden />}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Link href={ROUTES.dashboard} className="flex items-center gap-2.5" onClick={onClose}>
            <span className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">P</span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold">{APP_NAME}</span>
              <span className="block text-xs text-sidebar-foreground/60">{APP_TAGLINE}</span>
            </span>
          </Link>
          <button onClick={onClose} className="rounded p-1 text-sidebar-foreground/70 hover:text-sidebar-foreground lg:hidden" aria-label="Close menu">
            <X className="size-5" />
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 space-y-1 px-3 py-4">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground"
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
