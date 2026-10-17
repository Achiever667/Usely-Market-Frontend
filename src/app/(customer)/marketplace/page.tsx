"use client";

import { useState } from "react";

import { AppShell } from "@/components/layouts/app-shell";
import { ProductSearchBar } from "@/components/shared/product-search-bar";
import { ProductGrid } from "@/features/products/components/product-grid";
import type { Product } from "@/features/products/types/product.types";

const sampleProducts: Product[] = [
  {
    id: "prod_1",
    slug: "modular-desk",
    name: "Modular Standing Desk",
    description: "Adjustable workspace hardware from a verified vendor.",
    price: 389,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop",
    vendor: { id: "vendor_1", name: "Northline Goods" },
    category: { id: "cat_1", name: "Office" },
    status: "active",
    inventory: 42,
    rating: 4.8,
  },
  {
    id: "prod_2",
    slug: "travel-pack",
    name: "Weatherproof Travel Pack",
    description: "Daily carry pack with structured compartments and recycled shell fabric.",
    price: 128,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop",
    vendor: { id: "vendor_2", name: "Civic Supply" },
    category: { id: "cat_2", name: "Travel" },
    status: "active",
    inventory: 18,
    rating: 4.6,
  },
  {
    id: "prod_3",
    slug: "wireless-headphones",
    name: "Premium Wireless Headphones",
    description: "Noise-cancelling headphones with 30-hour battery life.",
    price: 299,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    vendor: { id: "vendor_3", name: "Audio Pro" },
    category: { id: "cat_3", name: "Electronics" },
    status: "active",
    inventory: 25,
    rating: 4.9,
  },
  {
    id: "prod_4",
    slug: "laptop-stand",
    name: "Ergonomic Laptop Stand",
    description: "Adjustable aluminum laptop stand for better posture.",
    price: 79,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1574928063383-e0e0dfa66ff0?q=80&w=1200&auto=format&fit=crop",
    vendor: { id: "vendor_1", name: "Northline Goods" },
    category: { id: "cat_1", name: "Office" },
    status: "active",
    inventory: 56,
    rating: 4.7,
  },
  {
    id: "prod_5",
    slug: "mechanical-keyboard",
    name: "RGB Mechanical Keyboard",
    description: "Professional-grade mechanical keyboard with customizable switches.",
    price: 159,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1587829191301-dc798b83add3?q=80&w=1200&auto=format&fit=crop",
    vendor: { id: "vendor_4", name: "Tech Hub" },
    category: { id: "cat_3", name: "Electronics" },
    status: "active",
    inventory: 30,
    rating: 4.8,
  },
  {
    id: "prod_6",
    slug: "desk-lamp",
    name: "LED Desk Lamp with USB Charging",
    description: "Modern LED desk lamp with built-in USB charging port.",
    price: 45,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1565636192335-14c06305d8e3?q=80&w=1200&auto=format&fit=crop",
    vendor: { id: "vendor_5", name: "Bright Lights" },
    category: { id: "cat_1", name: "Office" },
    status: "active",
    inventory: 72,
    rating: 4.6,
  },
  {
    id: "prod_7",
    slug: "webcam-4k",
    name: "4K Webcam Pro",
    description: "Ultra HD webcam with auto-focus for professional streaming.",
    price: 189,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop",
    vendor: { id: "vendor_4", name: "Tech Hub" },
    category: { id: "cat_3", name: "Electronics" },
    status: "active",
    inventory: 12,
    rating: 4.9,
  },
  {
    id: "prod_8",
    slug: "mouse-pad",
    name: "Large Extended Mouse Pad",
    description: "Smooth surface extended mouse pad with non-slip bottom.",
    price: 25,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
    vendor: { id: "vendor_2", name: "Civic Supply" },
    category: { id: "cat_1", name: "Office" },
    status: "active",
    inventory: 89,
    rating: 4.5,
  },
];

export default function MarketplacePage() {
  const [products, setProducts] = useState(sampleProducts);
  const [loading, setLoading] = useState(false);

  const handleSearch = (query: string) => {
    setLoading(true);
    // Simulate search delay
    setTimeout(() => {
      if (query.trim() === "") {
        setProducts(sampleProducts);
      } else {
        const filtered = sampleProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered);
      }
      setLoading(false);
    }, 300);
  };

  const handleFilterChange = () => {
    // Implement filter logic here
    console.log("Filter changed");
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Search Bar */}
        <ProductSearchBar
          onSearch={handleSearch}
          onCategoryChange={handleFilterChange}
          onLocationChange={handleFilterChange}
          onPriceChange={handleFilterChange}
        />

        {/* Results Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Featured Items</h2>
          <p className="text-sm text-muted-foreground">
            {products.length} items available in the marketplace
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} />
      </div>
    </AppShell>
  );
}
