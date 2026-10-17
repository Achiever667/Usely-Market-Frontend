"use client";

import * as React from "react";
import { UiButton } from "@/components/ui/button";
import { UiIcon } from "@/components/ui/icon";
import { UiModal } from "@/components/ui/UiModal";
import { AddProductForm } from "@/components/products/AddProductForm";

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <UiModal
        trigger={
          <UiButton className="rounded-2xl bg-success-500 text-white" aria-label="Add product">
            <div className="flex items-center gap-2">
              <UiIcon name="package-open" />
              <span>Add Product</span>
            </div>
          </UiButton>
        }
        title="Add Product"
      >
        <AddProductForm />
      </UiModal>

      <UiButton className="rounded-2xl bg-success-50 text-success-600 border border-border/60" aria-label="Add vendor">
        <div className="flex items-center gap-2">
          <UiIcon name="store" />
          <span>Add Vendor</span>
        </div>
      </UiButton>

      <UiButton className="rounded-2xl bg-background text-foreground border border-border/60" aria-label="Create coupon">
        <div className="flex items-center gap-2">
          <UiIcon name="check" />
          <span>Create Coupon</span>
        </div>
      </UiButton>

      <UiButton className="rounded-2xl bg-background text-foreground border border-border/60" aria-label="Send announcement">
        <div className="flex items-center gap-2">
          <UiIcon name="mail" />
          <span>Send Announcement</span>
        </div>
      </UiButton>
    </div>
  );
}
