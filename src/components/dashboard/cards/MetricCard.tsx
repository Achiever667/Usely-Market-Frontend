"use client";

import * as React from "react";
import { UiCard, UiCardContent } from "@/components/ui/card";
import { UiIcon } from "@/components/ui/icon";

type Props = {
  metric: string;
  value: string | number;
  hint?: string;
};

export function MetricCard({ metric, value, hint }: Props) {
  return (
    <UiCard className="p-4 shadow-xs rounded-2xl">
      <UiCardContent className="p-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground">{metric}</div>
            <div className="text-xl font-bold text-foreground">{value}</div>
          </div>
          <div className="size-9 grid place-items-center rounded-xl bg-success-50 text-success-600">
            <UiIcon name="trending-up" />
          </div>
        </div>
        {hint && <div className="mt-2 text-xs text-muted-foreground">{hint}</div>}
      </UiCardContent>
    </UiCard>
  );
}
