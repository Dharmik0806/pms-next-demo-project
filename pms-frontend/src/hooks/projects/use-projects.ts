"use client";
// TanStack Query hooks for the projects module.
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { normalizeError } from "@/helpers/normalize-error";
import { projectService, type ProjectListParams, type ProjectPayload } from "@/services/project";

export function useProjects(params: ProjectListParams) {
  return useQuery({
    queryKey: QUERY_KEYS.projects.list(params),
    queryFn: () => projectService.list(params),
    placeholderData: keepPreviousData,
  });
}

// Numbers + recent projects for the dashboard
export function useProjectStats() {
  return useQuery({ queryKey: QUERY_KEYS.projects.stats, queryFn: projectService.stats });
}

// Shared mutation wrapper: refresh every project query (lists AND dashboard stats).
function useProjectMutation<TVars>(fn: (vars: TVars) => Promise<unknown>, successMessage: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      toast.success(successMessage);
      qc.invalidateQueries({ queryKey: QUERY_KEYS.projects.all });
    },
    onError: (err) => toast.error(normalizeError(err)),
  });
}

export const useCreateProject = () =>
  useProjectMutation((payload: ProjectPayload) => projectService.create(payload), "Project created");

export const useUpdateProject = () =>
  useProjectMutation(({ id, payload }: { id: string; payload: Partial<ProjectPayload> }) => projectService.update(id, payload), "Project updated");

export const useDeleteProject = () =>
  useProjectMutation((id: string) => projectService.remove(id), "Project deleted");
