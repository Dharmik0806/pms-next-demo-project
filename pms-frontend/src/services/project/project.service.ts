import { api } from "@/lib/axios";
import { API } from "@/constants/api-endpoints";
import type { ApiResponse, PaginatedResult } from "@/types";
import type { DashboardStats, Project, ProjectListParams, ProjectPayload } from "./project.types";

export const projectService = {
  async list(params: ProjectListParams): Promise<PaginatedResult<Project>> {
    const { data } = await api.get<ApiResponse<Project[]>>(API.projects.list, { params });
    return { items: data.data, meta: data.meta! };
  },
  async stats() {
    const { data } = await api.get<ApiResponse<DashboardStats>>(API.projects.stats);
    return data.data;
  },
  async create(payload: ProjectPayload) {
    const { data } = await api.post<ApiResponse<Project>>(API.projects.list, payload);
    return data.data;
  },
  async update(id: string, payload: Partial<ProjectPayload>) {
    const { data } = await api.patch<ApiResponse<Project>>(API.projects.byId(id), payload);
    return data.data;
  },
  async remove(id: string) {
    await api.delete(API.projects.byId(id));
  },
};
