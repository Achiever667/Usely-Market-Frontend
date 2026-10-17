"use client";

import * as React from "react";
import { UiSkeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <UiSkeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <UiSkeleton className="h-48 rounded-2xl" />
        <UiSkeleton className="h-48 rounded-2xl" />
        <UiSkeleton className="h-48 rounded-2xl" />
      </div>

      <UiSkeleton className="h-64 rounded-2xl" />
    </div>
  );
}
