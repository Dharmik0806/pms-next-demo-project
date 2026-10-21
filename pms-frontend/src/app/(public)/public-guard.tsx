"use client";
// If the user is already logged in, skip login/register and go to the dashboard.
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { ROUTES } from "@/constants/routes";

export function PublicGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace(ROUTES.dashboard);
  }, [isAuthenticated, isLoading, router]);

  return <>{children}</>;
}
