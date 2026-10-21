// Shown by Next.js while a route segment is loading.
import { Loader2 } from "@/icons";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading">
      <Loader2 className="size-6 animate-spin text-primary" />
    </div>
  );
}
