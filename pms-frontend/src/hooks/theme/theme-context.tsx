"use client";
// Light/dark theme. We toggle the "dark" class on <html>; Tailwind reads it.
import { createContext, useCallback, useMemo, useSyncExternalStore } from "react";
import { THEME_KEY } from "@/constants/app.constants";
import type { Theme, ThemeContextValue } from "./theme.types";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

// Re-render whenever the class on <html> changes (the inline script in layout.tsx sets it first)
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const getSnapshot = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");
// The server cannot know the theme, so it renders "light" and the client corrects it
const getServerSnapshot = (): Theme => "light";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem(THEME_KEY, next); } catch { /* storage may be blocked */ }
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
