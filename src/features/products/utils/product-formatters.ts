import type { Product } from "@/features/products/types/product.types";
import { toCurrency } from "@/lib/utils";

export function formatProductPrice(product: Pick<Product, "price" | "currency">) {
  return toCurrency(product.price, product.currency);
}
