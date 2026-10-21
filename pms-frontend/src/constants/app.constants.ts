// Fixed values and enums used across the app.
export const APP_NAME = "PMS";
export const APP_TAGLINE = "Project Management System";
export const APP_DESCRIPTION =
  "PMS is a simple project management system. Create projects, set priorities and due dates, add your team and track progress from one clean dashboard.";

// localStorage key where the JWT is kept
export const TOKEN_KEY = "pms_token";
export const THEME_KEY = "pms_theme";

export const PAGE_SIZE = 9;

export const ROLES = ["admin", "manager", "member"] as const;
export const PROJECT_STATUSES = ["planning", "active", "on_hold", "completed"] as const;
export const PROJECT_PRIORITIES = ["low", "medium", "high"] as const;

// Label + badge colour for each status/priority/role (Tailwind classes)
export const STATUS_META: Record<(typeof PROJECT_STATUSES)[number], { label: string; badge: string; bar: string }> = {
  planning: { label: "Planning", badge: "bg-slate-500/10 text-slate-600 dark:text-slate-300", bar: "bg-slate-400" },
  active: { label: "Active", badge: "bg-blue-500/10 text-blue-600 dark:text-blue-300", bar: "bg-blue-500" },
  on_hold: { label: "On hold", badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300", bar: "bg-amber-500" },
  completed: { label: "Completed", badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", bar: "bg-emerald-500" },
};

export const PRIORITY_META: Record<(typeof PROJECT_PRIORITIES)[number], { label: string; badge: string; bar: string }> = {
  low: { label: "Low", badge: "bg-slate-500/10 text-slate-600 dark:text-slate-300", bar: "bg-slate-400" },
  medium: { label: "Medium", badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300", bar: "bg-amber-500" },
  high: { label: "High", badge: "bg-red-500/10 text-red-600 dark:text-red-300", bar: "bg-red-500" },
};

export const ROLE_META: Record<(typeof ROLES)[number], { label: string; badge: string }> = {
  admin: { label: "Admin", badge: "bg-violet-500/10 text-violet-600 dark:text-violet-300" },
  manager: { label: "Manager", badge: "bg-blue-500/10 text-blue-600 dark:text-blue-300" },
  member: { label: "Member", badge: "bg-slate-500/10 text-slate-600 dark:text-slate-300" },
};

// Helpers that turn the META objects above into <Select> options
export const STATUS_OPTIONS = PROJECT_STATUSES.map((v) => ({ value: v, label: STATUS_META[v].label }));
export const PRIORITY_OPTIONS = PROJECT_PRIORITIES.map((v) => ({ value: v, label: PRIORITY_META[v].label }));
export const ROLE_OPTIONS = ROLES.map((v) => ({ value: v, label: ROLE_META[v].label }));
