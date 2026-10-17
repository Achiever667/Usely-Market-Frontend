"use client";

import * as React from "react";
import { UiButton } from "@/components/ui/button";
import { UiIcon } from "@/components/ui/icon";

export function TopbarActions() {
  return (
    <>
      <UiButton variant="ghost" size="icon" aria-label="Notifications" className="relative size-9">
        <UiIcon name="bell" size={18} />
        <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
      </UiButton>
      <UiButton variant="ghost" size="icon" aria-label="Search" className="size-9">
        <UiIcon name="search" size={18} />
      </UiButton>
      <div className="h-5 w-px bg-border/70 shrink-0" aria-hidden="true" />
      <div className="relative size-8 overflow-hidden rounded-full ring-1 ring-border/40 cursor-pointer">
        <img src="/images/auth/logo.png" alt="avatar" className="object-cover w-full h-full" />
      </div>
    </>
  );
}
