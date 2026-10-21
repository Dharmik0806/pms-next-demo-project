// Every backend URL in one place (relative to NEXT_PUBLIC_API_URL).
export const API = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    password: "/auth/password",
  },
  users: {
    list: "/users",
    byId: (id: string) => `/users/${id}`,
    role: (id: string) => `/users/${id}/role`,
    active: (id: string) => `/users/${id}/active`,
  },
  projects: {
    list: "/projects",
    stats: "/projects/stats",
    byId: (id: string) => `/projects/${id}`,
  },
} as const;
