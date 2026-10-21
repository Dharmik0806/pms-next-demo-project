"use client";
// Create / edit project popup. When `project` is passed it edits, otherwise it creates.
import { Controller, useForm } from "react-hook-form";
import { AppButton, AppDialog, AppInput, AppSelect } from "@/components/common";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "@/constants/app.constants";
import { toInputDate } from "@/helpers/format-date";
import { useCreateProject, useUpdateProject } from "@/hooks/projects";
import { useUsers } from "@/hooks/users";
import { projectRules } from "@/rules/project.rules";
import type { Project, ProjectPayload } from "@/services/project";
import type { ProjectFormValues } from "./projects.types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project | null;
}

// The form lives in its own component so it is re-created (and reset) every time the dialog opens.
function ProjectForm({ project, onDone }: { project?: Project | null; onDone: () => void }) {
  const isEdit = !!project;
  const create = useCreateProject();
  const update = useUpdateProject();
  // Load people so the owner can pick team members
  const { data: usersData } = useUsers({ limit: 100 });

  const { register, handleSubmit, control, formState: { errors } } = useForm<ProjectFormValues>({
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
      status: project?.status ?? "planning",
      priority: project?.priority ?? "medium",
      progress: project?.progress ?? 0,
      startDate: toInputDate(project?.startDate),
      dueDate: toInputDate(project?.dueDate),
      members: project?.members.map((m) => m.id) ?? [],
    },
  });

  const saving = create.isPending || update.isPending;

  // Convert form values → API payload (empty dates become null)
  const onSubmit = (v: ProjectFormValues) => {
    const payload: ProjectPayload = {
      ...v,
      progress: Number(v.progress) || 0,
      startDate: v.startDate || null,
      dueDate: v.dueDate || null,
    };
    const options = { onSuccess: onDone };
    if (isEdit) update.mutate({ id: project!.id, payload }, options);
    else create.mutate(payload, options);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      <AppInput label="Project name" placeholder="e.g. Website redesign" error={errors.name?.message} {...register("name", projectRules.name)} />

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={3} placeholder="What is this project about?" aria-invalid={!!errors.description} {...register("description", projectRules.description)} />
        {errors.description && <p role="alert" className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Controller control={control} name="status" render={({ field }) => (
          <AppSelect label="Status" value={field.value} onValueChange={field.onChange} options={STATUS_OPTIONS} />
        )} />
        <Controller control={control} name="priority" render={({ field }) => (
          <AppSelect label="Priority" value={field.value} onValueChange={field.onChange} options={PRIORITY_OPTIONS} />
        )} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <AppInput label="Start date" type="date" {...register("startDate")} />
        <AppInput label="Due date" type="date" {...register("dueDate")} />
        <AppInput label="Progress (%)" type="number" min={0} max={100} error={errors.progress?.message} {...register("progress", { ...projectRules.progress, valueAsNumber: true })} />
      </div>

      {/* Team member checklist */}
      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium">Team members</legend>
        <Controller control={control} name="members" render={({ field }) => (
          <div className="max-h-40 space-y-1 overflow-y-auto rounded-md border p-2">
            {(usersData?.items ?? []).map((u) => {
              const checked = field.value.includes(u.id);
              return (
                <label key={u.id} className="flex cursor-pointer items-center gap-2.5 rounded px-2 py-1.5 text-sm hover:bg-accent">
                  <input
                    type="checkbox"
                    className="size-4 accent-[var(--primary)]"
                    checked={checked}
                    onChange={() => field.onChange(checked ? field.value.filter((id) => id !== u.id) : [...field.value, u.id])}
                  />
                  <span className="truncate">{u.name}</span>
                  <span className="ml-auto truncate text-xs text-muted-foreground">{u.email}</span>
                </label>
              );
            })}
            {!usersData && <p className="p-2 text-sm text-muted-foreground">Loading people…</p>}
          </div>
        )} />
      </fieldset>

      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <AppButton type="button" variant="outline" onClick={onDone}>Cancel</AppButton>
        <AppButton type="submit" loading={saving}>{isEdit ? "Save changes" : "Create project"}</AppButton>
      </div>
    </form>
  );
}

export function ProjectFormDialog({ open, onOpenChange, project }: Props) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={project ? "Edit project" : "New project"}
      description={project ? "Update the details below." : "Add the basics now – you can change them any time."}
      className="sm:max-w-xl"
    >
      {/* `key` forces a fresh form for each project */}
      {open && <ProjectForm key={project?.id ?? "new"} project={project} onDone={() => onOpenChange(false)} />}
    </AppDialog>
  );
}
