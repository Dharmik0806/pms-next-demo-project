import type { User } from "@/types";

export interface LoginPayload { email: string; password: string }
export interface RegisterPayload { name: string; email: string; password: string }
export interface AuthResult { user: User; token: string }
export interface UpdateProfilePayload { name?: string; avatar?: string }
export interface ChangePasswordPayload { currentPassword: string; newPassword: string }
