// "Are you sure?" popup used before deleting things.
import { AppButton } from "@/components/common/AppButton";
import { AppDialog } from "@/components/common/AppDialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
}

export function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel = "Delete", loading, onConfirm }: Props) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      footer={
        <>
          <AppButton variant="outline" onClick={() => onOpenChange(false)}>Cancel</AppButton>
          <AppButton variant="destructive" loading={loading} onClick={onConfirm}>{confirmLabel}</AppButton>
        </>
      }
    />
  );
}
