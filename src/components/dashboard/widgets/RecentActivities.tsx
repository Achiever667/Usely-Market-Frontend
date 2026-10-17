"use client";

import * as React from "react";
import { ActivityCard } from "@/components/dashboard/cards/ActivityCard";
import type { ActivityItem } from "@/types/dashboard.types";

export function RecentActivities({ activities = [] }: { activities?: ActivityItem[] }) {
  return (
    <div className="space-y-3">
      {activities.map((a) => (
        <ActivityCard key={a.id} activity={a} />
      ))}
    </div>
  );
}
