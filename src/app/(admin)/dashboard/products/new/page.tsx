"use client";

import * as React from "react";
import { DashboardTopbar, DashboardContent, DashboardPageHeader } from "@/components/dashboard/layout";
import { AddProductForm } from "@/components/products/AddProductForm";

export default function NewProductPage() {
  return (
    <>
      <DashboardTopbar title="Add Product" subtitle="Create a new product" />

      <DashboardContent>
        <DashboardPageHeader title="Add Product" description="Create a new product for your store." />
        <div className="max-w-2xl">
          <AddProductForm />
        </div>
      </DashboardContent>
    </>
  );
}
