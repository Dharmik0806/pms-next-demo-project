// Coloured badges for project status, priority and user role.
import { Badge } from "@/components/ui/badge";
import { PRIORITY_META, ROLE_META, STATUS_META } from "@/constants/app.constants";
import { cn } from "@/lib/utils";
import type { ProjectPriority, ProjectStatus, Role } from "@/types";

export const StatusBadge = ({ status }: { status: ProjectStatus }) => (
  <Badge className={cn(STATUS_META[status].badge)}>{STATUS_META[status].label}</Badge>
);

export const PriorityBadge = ({ priority }: { priority: ProjectPriority }) => (
  <Badge className={cn(PRIORITY_META[priority].badge)}>{PRIORITY_META[priority].label}</Badge>
);

export const RoleBadge = ({ role }: { role: Role }) => (
  <Badge className={cn(ROLE_META[role].badge)}>{ROLE_META[role].label}</Badge>
);
