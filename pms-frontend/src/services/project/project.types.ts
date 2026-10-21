import type { ListParams, ProjectPriority, ProjectStatus, UserSummary } from "@/types";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  startDate?: string;
  dueDate?: string;
  owner: UserSummary;
  members: UserSummary[];
  createdAt: string;
  updatedAt: string;
}

// What the create/edit form sends to the API
export interface ProjectPayload {
  name: string;
  description?: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  startDate?: string | null;
  dueDate?: string | null;
  members: string[]; // user ids
}

export interface ProjectListParams extends ListParams {
  status?: ProjectStatus | "";
  priority?: ProjectPriority | "";
}

export interface DashboardStats {
  total: number;
  overdue: number;
  status: Partial<Record<ProjectStatus, number>>;
  priority: Partial<Record<ProjectPriority, number>>;
  recent: Project[];
  totalUsers: number | null; // only admins receive this
}
