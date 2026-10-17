"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function DashboardContainer({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-card p-4 lg:p-6 shadow-sm">{children}</div>;
}

export function DashboardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-6 lg:grid-cols-12">{children}</div>;
}

export function DashboardSection({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <section className={cn("rounded-2xl p-4 lg:p-6", className)}>{children}</section>;
}

export function DashboardWidget({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn("rounded-2xl bg-background p-4 shadow-xs", className)}>{children}</div>;
}
