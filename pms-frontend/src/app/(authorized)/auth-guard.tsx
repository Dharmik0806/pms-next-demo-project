"use client";
// Protects every logged-in page. No token → redirect to /login.
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout";
import { Loader2 } from "@/icons";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/auth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace(ROUTES.login);
  }, [isAuthenticated, isLoading, router]);

  // While checking (or redirecting) show a spinner instead of flashing private content
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status" aria-label="Loading">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return <AppLayout>{children}</AppLayout>;
}
