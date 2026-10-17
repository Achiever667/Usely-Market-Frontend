"use client";

import * as React from "react";
import { UiCard, UiCardContent, UiCardHeader, UiCardTitle } from "@/components/ui/card";
import { LineChartWrapper } from "@/components/dashboard/charts/LineChartWrapper";

type Props = {
  title: string;
  data?: any[];
};

export function AnalyticsCard({ title, data = [] }: Props) {
  return (
    <UiCard className="p-4 shadow-sm rounded-2xl">
      <UiCardHeader className="p-0">
        <UiCardTitle className="text-sm text-muted-foreground">{title}</UiCardTitle>
      </UiCardHeader>
      <UiCardContent className="p-0 mt-3">
        <div className="h-44 w-full">
          <LineChartWrapper data={data} />
        </div>
      </UiCardContent>
    </UiCard>
  );
}
