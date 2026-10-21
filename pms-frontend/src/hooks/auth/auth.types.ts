import type { User } from "@/types";
import type { LoginPayload, RegisterPayload } from "@/services/auth";

export interface AuthContextValue {
  user: User | null;
  // true while we check the saved token on first load
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  // Replace the stored user after the profile is edited
  setUser: (user: User) => void;
}
