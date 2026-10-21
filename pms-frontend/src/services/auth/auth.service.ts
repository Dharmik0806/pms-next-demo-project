// Talks to /auth endpoints. Returns plain data (the envelope is removed here).
import { api } from "@/lib/axios";
import { API } from "@/constants/api-endpoints";
import type { ApiResponse, User } from "@/types";
import type { AuthResult, ChangePasswordPayload, LoginPayload, RegisterPayload, UpdateProfilePayload } from "./auth.types";

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post<ApiResponse<AuthResult>>(API.auth.login, payload);
    return data.data;
  },
  async register(payload: RegisterPayload) {
    const { data } = await api.post<ApiResponse<AuthResult>>(API.auth.register, payload);
    return data.data;
  },
  async me() {
    const { data } = await api.get<ApiResponse<User>>(API.auth.me);
    return data.data;
  },
  async updateProfile(payload: UpdateProfilePayload) {
    const { data } = await api.patch<ApiResponse<User>>(API.auth.me, payload);
    return data.data;
  },
  async changePassword(payload: ChangePasswordPayload) {
    await api.patch(API.auth.password, payload);
  },
};
