import { z } from "zod";

export const productFiltersSchema = z.object({
  query: z.string().optional(),
  categoryId: z.string().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type ProductFiltersInput = z.infer<typeof productFiltersSchema>;
