"use client";
// Users page: everyone can see the list; only admins can change roles, disable or delete.
import { useState } from "react";
import { AppPagination, AppSelect, ConfirmDialog, EmptyState, PageHeader, RoleBadge, UserAvatar } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Search, Trash2, UserCheck, UserX, Users } from "@/icons";
import { ROLE_OPTIONS } from "@/constants/app.constants";
import { formatDate } from "@/helpers/format-date";
import { useAuth } from "@/hooks/auth";
import { useDebounce } from "@/hooks/debounce";
import { useDeleteUser, useSetUserActive, useUpdateUserRole, useUsers, type UserFilters } from "@/hooks/users";
import type { Role, User } from "@/types";

const ALL = "all";

export function UsersView() {
  const { user: me } = useAuth();
  const isAdmin = me?.role === "admin";

  const [filters, setFilters] = useState<UserFilters>({ search: "", role: ALL, page: 1 });
  const [deleting, setDeleting] = useState<User | null>(null);
  const search = useDebounce(filters.search, 400);

  const { data, isLoading, isError } = useUsers({
    search,
    page: filters.page,
    limit: 10,
    role: filters.role === ALL ? "" : (filters.role as Role),
  });

  const updateRole = useUpdateUserRole();
  const setActive = useSetUserActive();
  const remove = useDeleteUser();

  const setFilter = (patch: Partial<UserFilters>) => setFilters((f) => ({ ...f, page: 1, ...patch }));

  return (
    <>
      <PageHeader title="Users" description={isAdmin ? "Manage who can access PMS and what they can do." : "People in your workspace."} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={filters.search} onChange={(e) => setFilter({ search: e.target.value })} placeholder="Search by name or email" aria-label="Search users" className="bg-card pl-9" />
        </div>
        <AppSelect ariaLabel="Filter by role" className="sm:w-44" triggerClassName="bg-card" value={filters.role} onValueChange={(v) => setFilter({ role: v })} options={[{ value: ALL, label: "All roles" }, ...ROLE_OPTIONS]} />
      </div>

      {isError ? (
        <p role="alert" className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">Couldn’t load users. Check that the API is running and try again.</p>
      ) : isLoading ? (
        <Skeleton className="h-72 rounded-xl" />
      ) : data && data.items.length === 0 ? (
        <EmptyState icon={<Users />} title="No users found" description="Try a different search or role filter." />
      ) : (
        <>
          <Card className="gap-0 overflow-hidden py-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  {isAdmin && <TableHead className="w-12"><span className="sr-only">Actions</span></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.items.map((u) => {
                  const isSelf = u.id === me?.id;
                  return (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <UserAvatar name={u.name} src={u.avatar} />
                          <div className="min-w-0">
                            <p className="truncate font-medium">{u.name}{isSelf && <span className="ml-1.5 text-xs font-normal text-muted-foreground">(you)</span>}</p>
                            <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {/* Admins get a role picker (not for their own row) */}
                        {isAdmin && !isSelf ? (
                          <AppSelect
                            ariaLabel={`Role for ${u.name}`}
                            className="w-32"
                            triggerClassName="h-8"
                            value={u.role}
                            onValueChange={(role) => updateRole.mutate({ id: u.id, role: role as Role })}
                            options={ROLE_OPTIONS}
                          />
                        ) : (
                          <RoleBadge role={u.role} />
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={u.isActive ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-red-500/10 text-red-600 dark:text-red-300"}>
                          {u.isActive ? "Active" : "Disabled"}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(u.createdAt)}</TableCell>
                      {isAdmin && (
                        <TableCell>
                          {!isSelf && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="size-8" aria-label={`Actions for ${u.name}`}><MoreHorizontal /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => setActive.mutate({ id: u.id, isActive: !u.isActive })}>
                                  {u.isActive ? <><UserX /> Disable</> : <><UserCheck /> Enable</>}
                                </DropdownMenuItem>
                                <DropdownMenuItem variant="destructive" onSelect={() => setDeleting(u)}><Trash2 /> Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
          <AppPagination meta={data?.meta} noun="users" onPageChange={(page) => setFilters((f) => ({ ...f, page }))} />
        </>
      )}

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
        title="Delete this user?"
        description={`${deleting?.name ?? "This user"} will lose access and be removed from all project teams.`}
        loading={remove.isPending}
        onConfirm={() => deleting && remove.mutate(deleting.id, { onSuccess: () => setDeleting(null) })}
      />
    </>
  );
}
