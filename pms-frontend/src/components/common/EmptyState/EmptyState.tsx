// Shown when a list has no items. Always tells the user what to do next.
import { cn } from "@/lib/utils";

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: Props) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-14 text-center", className)}>
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary [&_svg]:size-6">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
