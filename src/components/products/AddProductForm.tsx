"use client";

import * as React from "react";
import { UiButton } from "@/components/ui/button";
import { UiIcon } from "@/components/ui/icon";
import { UiInput } from "@/components/ui/input";

export function AddProductForm({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = { name, price, description };
    if (onSubmit) onSubmit(data);
    // noop: integrate with API later
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Product name</label>
        <UiInput value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} placeholder="e.g., Wireless Headphones" />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Price (cents)</label>
        <UiInput type="number" value={price} onChange={(e) => setPrice(Number((e.target as HTMLInputElement).value))} />
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription((e.target as HTMLTextAreaElement).value)} className="w-full rounded-md border bg-input px-3 py-2 text-sm" />
      </div>

      <div className="flex justify-end">
        <UiButton type="submit" className="rounded-2xl bg-success-500 text-white">
          <div className="flex items-center gap-2">
            <UiIcon name="package" />
            <span>Add Product</span>
          </div>
        </UiButton>
      </div>
    </form>
  );
}
