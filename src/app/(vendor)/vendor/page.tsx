"use client";

import { AppShell } from "@/components/layouts/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Guard } from "@/guards/Guard";

export default function VendorPage() {
  return (
    <Guard check={["auth", "vendor", "verified", "onboarding"]}>
      <AppShell>
        <PageHeader title="Vendor workspace" description="Vendor-only operations are protected by composable guards." />
      </AppShell>
    </Guard>
  );
}
