// Reads ?page=1&limit=10 from the query string and returns safe numbers.
export function getPagination(query: Record<string, unknown>) {
  const page = Math.max(parseInt(String(query.page ?? "1"), 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(String(query.limit ?? "10"), 10) || 10, 1), 100);
  return { page, limit, skip: (page - 1) * limit };
}

// Builds the same pagination object the frontend expects.
export function buildMeta(total: number, page: number, limit: number) {
  return { total, page, limit, totalPages: Math.max(Math.ceil(total / limit), 1) };
}

// Escapes user text so it is safe inside a RegExp (used for search).
export function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
