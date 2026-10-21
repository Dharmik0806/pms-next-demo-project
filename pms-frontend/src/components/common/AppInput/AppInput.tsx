// Label + Input + error message in one component.
// forwardRef lets React Hook Form's `register()` attach to the real <input>.
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
  hint?: string;
}

export const AppInput = React.forwardRef<HTMLInputElement, Props>(function AppInput(
  { label, error, hint, id, className, ...props },
  ref
) {
  const inputId = id ?? props.name ?? label;
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
});
