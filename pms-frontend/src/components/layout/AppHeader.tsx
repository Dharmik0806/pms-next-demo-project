"use client";
// Top bar: mobile menu button, breadcrumb, theme switch and user menu.
import Link from "next/link";
import { AppBreadcrumb } from "./AppBreadcrumb";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Menu, Moon, Sun, User } from "@/icons";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/auth";
import { useTheme } from "@/hooks/theme";

export function AppHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Open menu">
          <Menu />
        </Button>
        <AppBreadcrumb />
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50" aria-label="Open user menu">
              <UserAvatar name={user?.name ?? ""} src={user?.avatar} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <span className="block truncate">{user?.name}</span>
              <span className="block truncate text-xs font-normal text-muted-foreground">{user?.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={ROUTES.profile}><User /> Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={logout}><LogOut /> Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
