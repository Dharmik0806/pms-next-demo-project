// Standard envelope every API response uses.
import type { PaginationMeta } from "./pagination.types";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiErrorBody {
  success: false;
  message: string;
}
