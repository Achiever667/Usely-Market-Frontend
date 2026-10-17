"use client";

import * as React from "react";
import { UiCard, UiCardContent, UiCardHeader, UiCardTitle } from "@/components/ui/card";
import { UiIcon } from "@/components/ui/icon";

export function NotificationsWidget({ notifications = [] }: { notifications?: { id: string; title: string; time?: string }[] }) {
  return (
    <UiCard className="p-4 rounded-2xl shadow-xs">
      <UiCardHeader className="p-0">
        <UiCardTitle className="text-sm text-muted-foreground">Notifications</UiCardTitle>
      </UiCardHeader>
      <UiCardContent className="p-0 mt-3">
        <ul className="flex flex-col gap-3">
          {notifications.map((n) => (
            <li key={n.id} className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="size-8 grid place-items-center rounded bg-success-50 text-success-600">
                  <UiIcon name="mail" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{n.title}</div>
                  {n.time && <div className="text-xs text-muted-foreground">{n.time}</div>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </UiCardContent>
    </UiCard>
  );
}
