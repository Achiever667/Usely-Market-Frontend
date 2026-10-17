"use client";

import * as React from "react";
import { UiCard, UiCardContent, UiCardHeader, UiCardTitle } from "@/components/ui/card";
import { UiButton } from "@/components/ui/button";

type Column<T> = { key: string; header: string; render?: (item: T) => React.ReactNode };

export function DashboardTable<T>({
  title,
  columns,
  data = [],
}: {
  title?: string;
  columns: Column<T>[];
  data: T[];
}) {
  return (
    <UiCard className="rounded-2xl shadow-sm">
      <UiCardHeader className="p-4">
        <UiCardTitle className="text-sm text-muted-foreground">{title}</UiCardTitle>
      </UiCardHeader>
      <UiCardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-xs text-muted-foreground">
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3">{c.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-card"}>
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-sm text-foreground">
                      {c.render ? c.render(row) : (row as any)[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="text-xs text-muted-foreground">Showing {data.length} items</div>
          <div className="flex items-center gap-2">
            <UiButton variant="outline" size="sm">Prev</UiButton>
            <UiButton variant="outline" size="sm">Next</UiButton>
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  );
}
