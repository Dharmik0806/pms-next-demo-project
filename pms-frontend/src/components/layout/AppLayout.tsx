"use client";
// The shell around every logged-in page: sidebar + header + content area.
import { useState } from "react";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      <AppSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      {/* lg:pl-64 leaves room for the fixed sidebar on desktop */}
      <div className="lg:pl-64">
        <AppHeader onMenuClick={() => setMenuOpen(true)} />
        <main id="main-content" className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
