"use client";

import * as React from "react";
import { UiCard, UiCardContent, UiCardHeader, UiCardTitle } from "@/components/ui/card";
import { LineChartWrapper } from "@/components/dashboard/charts/LineChartWrapper";
import type { LineChartWrapperProps } from "@/components/dashboard/charts/LineChartWrapper";

export function UserGrowth({ data = [] }: { data?: LineChartWrapperProps["data"] }) {
  return (
    <UiCard className="p-4 rounded-2xl shadow-sm">
      <UiCardHeader className="p-0">
        <UiCardTitle className="text-sm text-muted-foreground">User Growth</UiCardTitle>
      </UiCardHeader>
      <UiCardContent className="p-0 mt-3">
        <div className="h-36 w-full">
          <LineChartWrapper data={data} stroke="text-success-600" />
        </div>
      </UiCardContent>
    </UiCard>
  );
}
