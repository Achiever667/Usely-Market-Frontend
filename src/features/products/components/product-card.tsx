"use client";

import Image from "next/image";
import { useState } from "react";

import { UiBadge } from "@/components/ui/badge";
import { UiButton } from "@/components/ui/button";
import {
  UiCard,
  UiCardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { Product } from "@/features/products/types/product.types";
import { toCurrency } from "@/lib/utils";
import { UiIcon } from "@/components/ui/icon";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const isInStock = product.inventory > 0;
  // const ratingPercentage = ((product.rating || 0) / 5) * 100;

  return (
    <UiCard
      className="group overflow-hidden rounded-3xl border border-success-100 bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:border-success-300 hover:shadow-lg"
      unstyled
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-success-50 to-background">
        <div className="relative aspect-square p-4 sm:p-5">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="absolute left-3 top-3 z-10">
          <UiBadge
            className={cn(
              "border-0 font-semibold text-[11px] uppercase tracking-[0.13em]",
              isInStock
                ? "bg-success-500 text-white"
                : "bg-danger-500 text-white"
            )}
          >
            {isInStock ? "In Stock" : "Sold Out"}
          </UiBadge>
        </div>

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-muted-foreground shadow-md transition duration-300 hover:bg-white hover:scale-105 active:scale-95"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <UiIcon
            name="heart"
            size={18}
            className={isWishlisted ? "text-danger-500" : "text-muted-foreground"}
          />
        </button>
      </div>

      <UiCardContent className="space-y-3 p-4">
        <div className="space-y-1">
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-success-600">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground hidden lg:block">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-base font-bold text-foreground">
              {toCurrency(product.price, product.currency)}
            </p>
            {product.inventory < 10 && product.inventory > 0 ? (
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-warning-600">
                Only {product.inventory} left
              </p>
            ) : (
              <p className="text-[11px] text-muted-foreground">{product.vendor.name}</p>
            )}
          </div>

          <UiButton
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success-500 p-0 text-white transition duration-300 hover:bg-success-600 disabled:bg-neutral-300 disabled:text-neutral-500"
            disabled={!isInStock}
            aria-label="Add to cart"
          >
            <UiIcon name="shopping-cart" size={16} />
          </UiButton>
        </div>
      </UiCardContent>
    </UiCard>
  );
}