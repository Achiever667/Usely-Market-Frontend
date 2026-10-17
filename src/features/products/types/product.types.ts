export type ProductStatus = "active" | "draft" | "archived";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  vendor: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  status: ProductStatus;
  inventory: number;
  rating: number;
};

export type ProductFilters = {
  query?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
};

export type ProductConnection = {
  items: Product[];
  pageInfo: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
};
