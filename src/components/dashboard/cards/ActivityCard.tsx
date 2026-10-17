"use client";

import * as React from "react";
import { UiCard, UiCardContent } from "@/components/ui/card";
import { UiIcon } from "@/components/ui/icon";
import { ActivityItem } from "@/types/dashboard.types";

type Props = {
  activity: ActivityItem;
};

export function ActivityCard({ activity }: Props) {
  return (
    <UiCard className="p-3 shadow-xs rounded-2xl">
      <UiCardContent className="p-0">
        <div className="flex items-start gap-3">
          <div className="size-9 grid place-items-center rounded-full bg-success-50 text-success-600">
            <UiIcon name="check" />
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">{activity.title}</div>
            <div className="text-xs text-muted-foreground">{activity.description}</div>
            <div className="mt-1 text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  );
}
