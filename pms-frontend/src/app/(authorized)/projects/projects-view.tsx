"use client";
// Projects page: search + filters + card grid + pagination + create/edit/delete.
import { useState } from "react";
import { AppButton, AppPagination, AppSelect, ConfirmDialog, EmptyState, PageHeader } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderKanban, Plus, Search } from "@/icons";
import { PAGE_SIZE, PRIORITY_OPTIONS, STATUS_OPTIONS } from "@/constants/app.constants";
import { useAuth } from "@/hooks/auth";
import { useDebounce } from "@/hooks/debounce";
import { useDeleteProject, useProjects, type ProjectFilters } from "@/hooks/projects";
import type { Project, ProjectListParams } from "@/services/project";
import { ProjectCard } from "./project-card";
import { ProjectFormDialog } from "./project-form-dialog";

const ALL = "all";

export function ProjectsView() {
  const { user } = useAuth();
  const [filters, setFilters] = useState<ProjectFilters>({ search: "", status: ALL, priority: ALL, page: 1 });
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<Project | null>(null);

  // Wait until the user stops typing before calling the API
  const search = useDebounce(filters.search, 400);

  // "all" means "no filter", so send an empty value to the API
  const params: ProjectListParams = {
    search,
    page: filters.page,
    limit: PAGE_SIZE,
    status: filters.status === ALL ? "" : (filters.status as ProjectListParams["status"]),
    priority: filters.priority === ALL ? "" : (filters.priority as ProjectListParams["priority"]),
  };

  const { data, isLoading, isError } = useProjects(params);
  const remove = useDeleteProject();

  // Changing any filter jumps back to page 1
  const setFilter = (patch: Partial<ProjectFilters>) => setFilters((f) => ({ ...f, page: 1, ...patch }));

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (p: Project) => { setEditing(p); setFormOpen(true); };

  // Owners and admins can manage a project
  const canManage = (p: Project) => user?.role === "admin" || p.owner.id === user?.id;

  const hasFilters = !!(filters.search || filters.status !== ALL || filters.priority !== ALL);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Everything you own or are part of."
        actions={<AppButton onClick={openCreate}><Plus /> New project</AppButton>}
      />

      {/* ---- Toolbar ---- */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={(e) => setFilter({ search: e.target.value })}
            placeholder="Search projects"
            aria-label="Search projects"
            className="bg-card pl-9"
          />
        </div>
        <AppSelect ariaLabel="Filter by status" className="sm:w-44" triggerClassName="bg-card" value={filters.status} onValueChange={(v) => setFilter({ status: v })} options={[{ value: ALL, label: "All statuses" }, ...STATUS_OPTIONS]} />
        <AppSelect ariaLabel="Filter by priority" className="sm:w-44" triggerClassName="bg-card" value={filters.priority} onValueChange={(v) => setFilter({ priority: v })} options={[{ value: ALL, label: "All priorities" }, ...PRIORITY_OPTIONS]} />
      </div>

      {/* ---- Content ---- */}
      {isError ? (
        <p role="alert" className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">Couldn’t load projects. Check that the API is running and try again.</p>
      ) : isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-xl" />)}
        </div>
      ) : data && data.items.length === 0 ? (
        <EmptyState
          icon={<FolderKanban />}
          title={hasFilters ? "No projects match your filters" : "No projects yet"}
          description={hasFilters ? "Try a different search or clear the filters." : "Create your first project to start tracking progress."}
          action={!hasFilters && <AppButton onClick={openCreate}><Plus /> New project</AppButton>}
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.items.map((p) => (
              <ProjectCard key={p.id} project={p} canManage={canManage(p)} onEdit={openEdit} onDelete={setDeleting} />
            ))}
          </div>
          <AppPagination meta={data?.meta} noun="projects" onPageChange={(page) => setFilters((f) => ({ ...f, page }))} />
        </>
      )}

      {/* ---- Dialogs ---- */}
      <ProjectFormDialog open={formOpen} onOpenChange={setFormOpen} project={editing} />
      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title="Delete this project?"
        description={`“${deleting?.name ?? ""}” will be removed permanently. This can’t be undone.`}
        loading={remove.isPending}
        onConfirm={() => deleting && remove.mutate(deleting.id, { onSuccess: () => setDeleting(null) })}
      />
    </>
  );
}
