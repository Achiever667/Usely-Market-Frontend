import type * as React from "react";

import { UiIcon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: IconName;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ title, description, icon = "package-open", action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center", className)}>
      <UiIcon name={icon} className="mb-4 size-10 text-muted-foreground" />
      <h3 className="text-base font-semibold">{title}</h3>
      {description ? <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
