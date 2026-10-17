"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

export interface LineChartWrapperProps {
  data?: Array<{ name: string; value: number; [key: string]: any }>;
  stroke?: string;
  className?: string;
}

const defaultData = [
  { name: "Day 1", value: 300 },
  { name: "Day 2", value: 450 },
  { name: "Day 3", value: 350 },
  { name: "Day 4", value: 520 },
  { name: "Day 5", value: 480 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-neutral-200/80 bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95">
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {label}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="size-2 rounded-full bg-success-600" />
          <p className="text-sm font-bold text-neutral-900 dark:text-white">
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
}

export function LineChartWrapper({
  data = [],
  stroke = "currentColor",
  className,
}: LineChartWrapperProps) {
  const chartData = data.length > 0 ? data : defaultData;

  return (
    <div className={cn("w-full h-full text-success-600", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 12, right: 12, left: -16, bottom: 4 }}
        >
          <defs>
            <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="currentColor" stopOpacity={0.35} />
              <stop offset="95%" stopColor="currentColor" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="currentColor"
            opacity={0.1}
          />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "currentColor", fontSize: 12 }}
            dy={10}
            opacity={0.6}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "currentColor", fontSize: 12 }}
            dx={-8}
            opacity={0.6}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#successGradient)"
            activeDot={{
              r: 6,
              stroke: "#ffffff",
              strokeWidth: 2,
              fill: "currentColor",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}