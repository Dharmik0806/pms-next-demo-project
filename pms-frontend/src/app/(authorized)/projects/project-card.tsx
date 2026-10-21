"use client";
// One project shown as a card in the grid.
import { PriorityBadge, StatusBadge, UserAvatar } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Calendar, MoreHorizontal, Pencil, Trash2 } from "@/icons";
import { STATUS_META } from "@/constants/app.constants";
import { formatDate, isPast } from "@/helpers/format-date";
import { cn } from "@/lib/utils";
import type { Project } from "@/services/project";

interface Props {
  project: Project;
  canManage: boolean; // only owner/admin can edit or delete
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function ProjectCard({ project, canManage, onEdit, onDelete }: Props) {
  const overdue = project.status !== "completed" && isPast(project.dueDate);
  const team = [project.owner, ...project.members.filter((m) => m.id !== project.owner.id)];

  return (
    <Card className="gap-4">
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{project.name}</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <StatusBadge status={project.status} />
              <PriorityBadge priority={project.priority} />
            </div>
          </div>

          {canManage && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="-mr-2 size-8" aria-label={`Actions for ${project.name}`}><MoreHorizontal /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => onEdit(project)}><Pencil /> Edit</DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onSelect={() => onDelete(project)}><Trash2 /> Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">{project.description || "No description."}</p>

        <div>
          <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="tabular-nums">{project.progress}%</span>
          </div>
          <Progress value={project.progress} indicatorClassName={STATUS_META[project.status].bar} />
        </div>

        <div className="flex items-center justify-between">
          <span className={cn("flex items-center gap-1.5 text-xs", overdue ? "font-medium text-destructive" : "text-muted-foreground")}>
            <Calendar className="size-3.5" />
            {overdue ? "Overdue · " : "Due "}{formatDate(project.dueDate)}
          </span>
          {/* Overlapping avatars of the team (max 4) */}
          <div className="flex -space-x-2" title={team.map((t) => t.name).join(", ")}>
            {team.slice(0, 4).map((m) => (
              <UserAvatar key={m.id} name={m.name} src={m.avatar} className="size-7 ring-2 ring-card" />
            ))}
            {team.length > 4 && (
              <span className="z-10 flex size-7 items-center justify-center rounded-full bg-muted text-[11px] font-medium ring-2 ring-card">+{team.length - 4}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
