import * as React from "react";

import { cn } from "@/lib/utils";
import { UiIcon } from "@/components/ui/icon";

export type UiCheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

const UiCheckbox = React.forwardRef<HTMLInputElement, UiCheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          data-slot="checkbox"
          className={cn(
            "peer size-4 appearance-none rounded border border-neutral-300 bg-background transition-colors",
            "checked:border-success-600 checked:bg-success-600",
            "hover:border-success-500",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <UiIcon
          name="check"
          className="pointer-events-none absolute size-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
        />
      </span>
    );
  }
);

UiCheckbox.displayName = "UiCheckbox";

export { UiCheckbox };
