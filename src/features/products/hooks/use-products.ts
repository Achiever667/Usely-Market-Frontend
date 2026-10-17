"use client";

import { useQuery } from "@tanstack/react-query";

import { productsApi } from "@/features/products/api/products.api";
import type { ProductFilters } from "@/features/products/types/product.types";

export const productQueryKeys = {
  all: ["products"] as const,
  list: (filters: ProductFilters) => [...productQueryKeys.all, "list", filters] as const,
};

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: productQueryKeys.list(filters),
    queryFn: () => productsApi.list(filters),
  });
}
