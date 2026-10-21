// Types used only by the Projects page.
import type { ProjectPriority, ProjectStatus } from "@/types";

// Values handled by the create/edit form (dates stay as "YYYY-MM-DD" strings)
export interface ProjectFormValues {
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  startDate: string;
  dueDate: string;
  members: string[];
}
