// Types shared by many modules.
import type { PROJECT_PRIORITIES, PROJECT_STATUSES, ROLES } from "@/constants/app.constants";

export type Role = (typeof ROLES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type ProjectPriority = (typeof PROJECT_PRIORITIES)[number];

// Shape of a user returned by the API
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// A user as shown inside a project (owner / members)
export type UserSummary = Pick<User, "id" | "name" | "email" | "avatar">;
