import { api } from "@/lib/axios";
import { API } from "@/constants/api-endpoints";
import type { ApiResponse, PaginatedResult, Role, User } from "@/types";
import type { UserListParams } from "./user.types";

export const userService = {
  async list(params: UserListParams): Promise<PaginatedResult<User>> {
    const { data } = await api.get<ApiResponse<User[]>>(API.users.list, { params });
    return { items: data.data, meta: data.meta! };
  },
  async updateRole(id: string, role: Role) {
    const { data } = await api.patch<ApiResponse<User>>(API.users.role(id), { role });
    return data.data;
  },
  async setActive(id: string, isActive: boolean) {
    const { data } = await api.patch<ApiResponse<User>>(API.users.active(id), { isActive });
    return data.data;
  },
  async remove(id: string) {
    await api.delete(API.users.byId(id));
  },
};
