"use client";
// TanStack Query hooks for the users module.
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { normalizeError } from "@/helpers/normalize-error";
import { userService, type UserListParams } from "@/services/user";
import type { Role } from "@/types";

// List users (paginated + searchable). keepPreviousData avoids flicker between pages.
export function useUsers(params: UserListParams) {
  return useQuery({
    queryKey: QUERY_KEYS.users.list(params),
    queryFn: () => userService.list(params),
    placeholderData: keepPreviousData,
  });
}

// Small helper: every mutation refreshes the users list and shows a toast.
function useUserMutation<TVars>(fn: (vars: TVars) => Promise<unknown>, successMessage: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      toast.success(successMessage);
      qc.invalidateQueries({ queryKey: QUERY_KEYS.users.all });
    },
    onError: (err) => toast.error(normalizeError(err)),
  });
}

export const useUpdateUserRole = () =>
  useUserMutation(({ id, role }: { id: string; role: Role }) => userService.updateRole(id, role), "Role updated");

export const useSetUserActive = () =>
  useUserMutation(({ id, isActive }: { id: string; isActive: boolean }) => userService.setActive(id, isActive), "User updated");

export const useDeleteUser = () => useUserMutation((id: string) => userService.remove(id), "User deleted");
