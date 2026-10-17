"use client";

import * as React from "react";
import { UiCard, UiCardContent } from "@/components/ui/card";
import { UiIcon } from "@/components/ui/icon";

export function SystemHealth() {
  const items = [
    { id: 'server', label: 'Server Status', status: 'Healthy' },
    { id: 'db', label: 'Database', status: 'Healthy' },
    { id: 'storage', label: 'Storage', status: 'Warning' },
    { id: 'api', label: 'API Services', status: 'Healthy' },
  ];

  return (
    <UiCard className="p-4 rounded-2xl shadow-xs">
      <UiCardContent className="p-0">
        <div className="flex flex-col gap-3">
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 grid place-items-center rounded bg-success-50 text-success-600">
                  <UiIcon name="shield-check" />
                </div>
                <div className="text-sm">{it.label}</div>
              </div>
              <div className={it.status === 'Healthy' ? 'text-success-600 text-sm font-medium' : 'text-warning-600 text-sm font-medium'}>{it.status}</div>
            </div>
          ))}
        </div>
      </UiCardContent>
    </UiCard>
  );
}
