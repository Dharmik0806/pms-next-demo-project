// Label + shadcn Select. Pass `options` as [{ value, label }].
// Works with React Hook Form via <Controller> (value / onValueChange).
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectOption { value: string; label: string }

interface Props {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  // aria-label for selects that have no visible label (e.g. table filters)
  ariaLabel?: string;
}

export function AppSelect({ label, value, onValueChange, options, placeholder, error, disabled, className, triggerClassName, ariaLabel }: Props) {
  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label>{label}</Label>}
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger aria-label={ariaLabel ?? label} aria-invalid={!!error} className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
