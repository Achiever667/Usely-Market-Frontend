import type { ProductConnection, ProductFilters } from "@/features/products/types/product.types";
import { graphqlRequest } from "@/lib/graphql-client";

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($filters: ProductFiltersInput) {
    products(filters: $filters) {
      items {
        id
        slug
        name
        description
        price
        currency
        imageUrl
        status
        inventory
        rating
        vendor {
          id
          name
        }
        category {
          id
          name
        }
      }
      pageInfo {
        page
        pageSize
        totalPages
        totalItems
      }
    }
  }
`;

export const productsApi = {
  async list(filters: ProductFilters = {}) {
    const data = await graphqlRequest<{ products: ProductConnection }, { filters: ProductFilters }>(
      PRODUCTS_QUERY,
      { filters },
    );

    return data.products;
  },
};
