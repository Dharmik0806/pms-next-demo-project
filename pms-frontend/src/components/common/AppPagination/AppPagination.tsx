// Previous / Next buttons with "Page X of Y".
import { AppButton } from "@/components/common/AppButton";
import { ChevronLeft, ChevronRight } from "@/icons";
import type { PaginationMeta } from "@/types";

interface Props {
  meta?: PaginationMeta;
  onPageChange: (page: number) => void;
  noun?: string; // "projects", "users" ...
}

export function AppPagination({ meta, onPageChange, noun = "items" }: Props) {
  if (!meta || meta.total === 0) return null;
  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4 pt-2">
      <p className="text-sm text-muted-foreground">
        {meta.total} {noun} · Page {meta.page} of {meta.totalPages}
      </p>
      <div className="flex gap-2">
        <AppButton variant="outline" size="sm" disabled={meta.page <= 1} onClick={() => onPageChange(meta.page - 1)}>
          <ChevronLeft /> Previous
        </AppButton>
        <AppButton variant="outline" size="sm" disabled={meta.page >= meta.totalPages} onClick={() => onPageChange(meta.page + 1)}>
          Next <ChevronRight />
        </AppButton>
      </div>
    </nav>
  );
}
