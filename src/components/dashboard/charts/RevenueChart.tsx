"use client";

import * as React from "react";
import { LineChartWrapper } from "./LineChartWrapper";

export function RevenueChart({ data = [] }: { data?: any[] }) {
  return <LineChartWrapper data={data} stroke="currentColor" />;
}
