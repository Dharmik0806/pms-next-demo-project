// Simple progress bar (value 0–100). Accessible via role="progressbar".
import { cn } from "@/lib/utils";

function Progress({ value = 0, className, indicatorClassName }: { value?: number; className?: string; indicatorClassName?: string }) {
  const safe = Math.min(Math.max(value, 0), 100);
  return (
    <div role="progressbar" aria-valuenow={safe} aria-valuemin={0} aria-valuemax={100} className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div className={cn("h-full rounded-full bg-primary transition-all", indicatorClassName)} style={{ width: `${safe}%` }} />
    </div>
  );
}

export { Progress };
