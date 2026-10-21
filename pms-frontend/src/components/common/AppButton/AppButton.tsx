// Button that can show a loading spinner. Use it for every submit/save action.
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "@/icons";

type Props = React.ComponentProps<typeof Button> & { loading?: boolean };

export function AppButton({ loading = false, disabled, children, ...props }: Props) {
  return (
    <Button disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  );
}
