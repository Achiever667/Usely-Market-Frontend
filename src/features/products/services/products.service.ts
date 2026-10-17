import { productFiltersSchema } from "@/features/products/schemas/product.schema";
import type { ProductFilters } from "@/features/products/types/product.types";

export const productsService = {
  normalizeFilters(filters: ProductFilters) {
    return productFiltersSchema.parse(filters);
  },
};
