"use client";
// Dashboard: summary cards, status/priority breakdown and the latest projects.
import Link from "next/link";
import { EmptyState, PageHeader, PriorityBadge, StatusBadge } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, CheckCircle2, FolderKanban, Plus, Users, Zap } from "@/icons";
import { PRIORITY_META, PROJECT_PRIORITIES, PROJECT_STATUSES, STATUS_META } from "@/constants/app.constants";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/helpers/format-date";
import { useAuth } from "@/hooks/auth";
import { useProjectStats } from "@/hooks/projects";
import { cn } from "@/lib/utils";

// One horizontal bar per key (used for both status and priority)
function Breakdown({ keys, counts, meta, total }: {
  keys: readonly string[];
  counts: Partial<Record<string, number>>;
  meta: Record<string, { label: string; bar: string }>;
  total: number;
}) {
  return (
    <ul className="space-y-4">
      {keys.map((key) => {
        const count = counts[key] ?? 0;
        const pct = total ? Math.round((count / total) * 100) : 0;
        return (
          <li key={key}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span>{meta[key].label}</span>
              <span className="text-muted-foreground tabular-nums">{count}</span>
            </div>
            <Progress value={pct} indicatorClassName={meta[key].bar} />
          </li>
        );
      })}
    </ul>
  );
}

export function DashboardView() {
  const { user } = useAuth();
  const { data, isLoading, isError } = useProjectStats();

  // Summary cards. Admins see the team size, everyone else sees completed projects.
  const cards = data
    ? [
        { label: "Total projects", value: data.total, icon: FolderKanban, tone: "text-primary bg-primary/10" },
        { label: "Active", value: data.status.active ?? 0, icon: Zap, tone: "text-blue-600 bg-blue-500/10 dark:text-blue-300" },
        { label: "Overdue", value: data.overdue, icon: AlertTriangle, tone: "text-red-600 bg-red-500/10 dark:text-red-300" },
        data.totalUsers !== null
          ? { label: "Team members", value: data.totalUsers, icon: Users, tone: "text-violet-600 bg-violet-500/10 dark:text-violet-300" }
          : { label: "Completed", value: data.status.completed ?? 0, icon: CheckCircle2, tone: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-300" },
      ]
    : [];

  return (
    <>
      <PageHeader
        title={`Hello, ${user?.name.split(" ")[0] ?? "there"}`}
        description="Here’s where your projects stand today."
        actions={<Button asChild><Link href={ROUTES.projects}><Plus /> New project</Link></Button>}
      />

      {isError && <p role="alert" className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">Couldn’t load the dashboard. Check that the API is running and refresh.</p>}

      {/* ---- Summary cards ---- */}
      <section aria-label="Summary" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[92px] rounded-xl" />)
          : cards.map(({ label, value, icon: Icon, tone }) => (
              <Card key={label} className="py-4">
                <CardContent className="flex items-center gap-4">
                  <div className={cn("flex size-11 items-center justify-center rounded-lg", tone)}><Icon className="size-5" /></div>
                  <div>
                    <p className="text-2xl font-semibold tabular-nums">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
      </section>

      {data && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* ---- Breakdown cards ---- */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>By status</CardTitle><CardDescription>How far along everything is</CardDescription></CardHeader>
              <CardContent><Breakdown keys={PROJECT_STATUSES} counts={data.status} meta={STATUS_META} total={data.total} /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>By priority</CardTitle><CardDescription>What needs attention first</CardDescription></CardHeader>
              <CardContent><Breakdown keys={PROJECT_PRIORITIES} counts={data.priority} meta={PRIORITY_META} total={data.total} /></CardContent>
            </Card>
          </div>

          {/* ---- Recent projects ---- */}
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Recently updated</CardTitle><CardDescription>Your five latest projects</CardDescription></CardHeader>
            <CardContent>
              {data.recent.length === 0 ? (
                <EmptyState
                  icon={<FolderKanban />}
                  title="No projects yet"
                  description="Create your first project to see it here."
                  action={<Button asChild><Link href={ROUTES.projects}>Go to projects</Link></Button>}
                />
              ) : (
                <ul className="divide-y">
                  {data.recent.map((p) => (
                    <li key={p.id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{p.name}</p>
                        <p className="text-sm text-muted-foreground">Due {formatDate(p.dueDate)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <PriorityBadge priority={p.priority} />
                        <StatusBadge status={p.status} />
                        <span className="w-10 text-right text-sm text-muted-foreground tabular-nums">{p.progress}%</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
