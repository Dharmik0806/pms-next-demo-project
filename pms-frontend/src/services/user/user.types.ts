import type { ListParams, Role } from "@/types";

export interface UserListParams extends ListParams { role?: Role | "" }
