// Pagination info returned by list endpoints.
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: PaginationMeta;
}

// Query params accepted by list endpoints
export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
}
