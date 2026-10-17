"use client";

import * as React from "react";
import { UiCard, UiCardContent, UiCardHeader, UiCardTitle } from "@/components/ui/card";
import { RevenueChart } from "@/components/dashboard/charts/RevenueChart";

export function RevenueOverview({ data = [] }: { data?: unknown[] }) {
  return (
    <UiCard className="p-4 rounded-2xl shadow-sm">
      <UiCardHeader className="p-0">
        <UiCardTitle className="text-sm text-muted-foreground">Revenue Overview</UiCardTitle>
      </UiCardHeader>
      <UiCardContent className="p-0 mt-3">
        <div className="h-48 w-full">
          <RevenueChart data={data} />
        </div>
      </UiCardContent>
    </UiCard>
  );
}
