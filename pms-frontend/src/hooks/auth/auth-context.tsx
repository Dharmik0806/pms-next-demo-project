"use client";
// Holds the logged-in user for the whole app.
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { TOKEN_KEY } from "@/constants/app.constants";
import { ROUTES } from "@/constants/routes";
import { authService } from "@/services/auth";
import type { User } from "@/types";
import type { AuthContextValue } from "./auth.types";

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load: if a token exists, ask the API who the user is.
  // (We always go through a Promise so state updates happen in callbacks, not synchronously.)
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const request = token ? authService.me() : Promise.resolve(null);
    request
      .then(setUser)
      .catch(() => localStorage.removeItem(TOKEN_KEY)) // token is invalid → forget it
      .finally(() => setIsLoading(false));
  }, []);

  const login: AuthContextValue["login"] = useCallback(async (payload) => {
    const { user, token } = await authService.login(payload);
    localStorage.setItem(TOKEN_KEY, token);
    setUser(user);
  }, []);

  const register: AuthContextValue["register"] = useCallback(async (payload) => {
    const { user, token } = await authService.register(payload);
    localStorage.setItem(TOKEN_KEY, token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    queryClient.clear(); // drop cached data from the previous user
    router.replace(ROUTES.login);
  }, [queryClient, router]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, isAuthenticated: !!user, login, register, logout, setUser }),
    [user, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
