"use client";

import { AppShell } from "@/components/layouts/app-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Guard } from "@/guards/Guard";

export default function CartPage() {
  return (
    <Guard check={["auth"]}>
      <AppShell>
        <PageHeader title="Cart" description="Client cart state is isolated in the cart feature store." />
        <div className="mt-8">
          <EmptyState title="Your cart is empty" description="Add products from the marketplace to start checkout." />
        </div>
      </AppShell>
    </Guard>
  );
}
