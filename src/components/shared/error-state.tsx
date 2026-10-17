import type * as React from "react";

import { UiButton } from "@/components/ui/button";
import { UiIcon } from "@/components/ui/icon";

type ErrorStateProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onRetry?: () => void;
};

export function ErrorState({ title = "Something went wrong", description, action, onRetry }: ErrorStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <UiIcon name="alert-triangle" className="mb-4 size-10 text-destructive" />
      <h3 className="text-base font-semibold">{title}</h3>
      {description ? <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p> : null}
      {action ?? (onRetry ? <UiButton className="mt-4" onClick={onRetry}>Try again</UiButton> : null)}
    </div>
  );
}
