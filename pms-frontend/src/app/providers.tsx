"use client";
// All client-side providers in one place. Order matters:
// Theme → React Query → Auth (Auth uses React Query's client).
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/auth";
import { ThemeProvider } from "@/hooks/theme";
import { makeQueryClient } from "@/lib/query-client";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  // useState keeps ONE QueryClient for the whole session
  const [queryClient] = useState(makeQueryClient);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
