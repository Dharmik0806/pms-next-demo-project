"use client";
// Toast notifications (sonner), themed with our own theme hook.
import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/hooks/theme";

function Toaster() {
  const { theme } = useTheme();
  return <Sonner theme={theme} position="top-right" richColors closeButton />;
}

export { Toaster };
