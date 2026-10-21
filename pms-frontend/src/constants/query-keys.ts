// TanStack Query cache keys. Keeping them here avoids typos and makes
// invalidation easy: queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects.all })
export const QUERY_KEYS = {
  projects: {
    all: ["projects"] as const,
    list: (params: object) => ["projects", "list", params] as const,
    stats: ["projects", "stats"] as const,
  },
  users: {
    all: ["users"] as const,
    list: (params: object) => ["users", "list", params] as const,
  },
} as const;
