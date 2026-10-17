"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { UiCard, UiCardContent, UiCardHeader, UiCardTitle } from "@/components/ui/card";
import { UiIcon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: string | number;
  delta?: number;
  icon?: string;
  className?: string;
};

export function StatsCard({ title, value, delta, icon, className }: Props) {
  const isPositive = typeof delta !== "undefined" && delta >= 0;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <UiCard
        className={cn(
          "relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-xs transition-shadow duration-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900",
          className
        )}
      >
        <UiCardHeader className="p-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-600 border border-success-100/80 dark:bg-success-950/40 dark:text-success-400 dark:border-success-900/50">
                  <UiIcon name={icon as any} className="size-5" />
                </div>
              )}
              <div>
                <UiCardTitle className="text-sm font-medium text-muted-foreground">
                  {title}
                </UiCardTitle>
                <div className="text-xl font-bold text-foreground">
                  {value}
                </div>
              </div>
            </div>

            {typeof delta !== "undefined" && (
              <div
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium transition-colors",
                  isPositive
                    ? "bg-success-50 text-success-600 dark:bg-success-950/50 dark:text-success-400"
                    : "bg-danger-50 text-danger-600 dark:bg-danger-950/50 dark:text-danger-400"
                )}
              >
                <UiIcon
                  name={(isPositive ? "trending-up" : "trending-down") as any}
                  className="size-3.5"
                />
                <span>{isPositive ? `+${delta}%` : `${delta}%`}</span>
              </div>
            )}
          </div>
        </UiCardHeader>

        <UiCardContent className="p-0 mt-3 flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-success-500" />
          </span>
          <span>Updating in real-time</span>
        </UiCardContent>
      </UiCard>
    </motion.div>
  );
}