"use client";

import * as React from "react";
import {
  UiCard,
  UiCardContent,
  UiCardHeader,
  UiCardTitle,
} from "@/components/ui/card";
import { UiIcon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { ProductSummary } from "@/types/dashboard.types";
import Image from "next/image";

export interface TopProductsProps {
  products?: ProductSummary[];
  className?: string;
}

const defaultProducts: ProductSummary[] = [
  { id: "1", name: "Organic Matcha Green Tea", sold: 1240, price: 24.99, imageUrl: "" },
  { id: "2", name: "Premium Artisan Coffee Beans", sold: 980, price: 18.50, imageUrl: "" },
  { id: "3", name: "Handmade Ceramic Mug", sold: 750, price: 32.00, imageUrl: "" },
  { id: "4", name: "Eco-Friendly Yoga Mat", sold: 620, price: 45.00, imageUrl: "" },
];

export function TopProducts({ products = [], className }: TopProductsProps) {
  const displayProducts = products.length > 0 ? products : defaultProducts;

  return (
    <UiCard
      className={cn(
        "rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900",
        className
      )}
    >
      <UiCardHeader className="flex flex-row items-center justify-between p-0 pb-4">
        <UiCardTitle className="text-base font-bold text-neutral-900 dark:text-white">
          Top Selling Products
        </UiCardTitle>
        <span className="rounded-full bg-success-50 px-2.5 py-1 text-xs font-semibold text-success-600 dark:bg-success-950/50 dark:text-success-400">
          This Month
        </span>
      </UiCardHeader>
      <UiCardContent className="p-0">
        <div className="flex flex-col gap-3">
          {displayProducts.map((p, index) => (
            <div
              key={p.id ?? index}
              className="group flex items-center justify-between gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative size-13 shrink-0 overflow-hidden rounded-xl border border-neutral-200/60 bg-success-50/50 dark:border-neutral-800 dark:bg-success-950/20">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      sizes="52px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-success-600 dark:text-success-400">
                      <UiIcon name="package-open" className="size-6" />
                    </div>
                  )}
                  <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-br-lg bg-success-600 text-[10px] font-bold text-white shadow-xs">
                    #{index + 1}
                  </span>
                </div>

                <div>
                  <div className="text-sm font-semibold text-neutral-900 transition-colors group-hover:text-success-600 dark:text-white dark:group-hover:text-success-400 line-clamp-1">
                    {p.name}
                  </div>
                  <div className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                    Sold: <strong className="text-neutral-700 dark:text-neutral-300">{(p.sold ?? 0).toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              <div className="text-sm font-bold text-neutral-900 dark:text-white">
                ${typeof p.price === "number" ? p.price.toFixed(2) : p.price}
              </div>
            </div>
          ))}
        </div>
      </UiCardContent>
    </UiCard>
  );
}