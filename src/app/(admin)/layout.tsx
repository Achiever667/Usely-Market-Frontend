"use client";

import * as React from "react";
import { DashboardShell, DashboardMain, DashboardTopbar } from "@/components/dashboard/layout";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { TopbarActions } from "@/components/dashboard/TopbarActions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell>
      <div className="flex min-h-dvh">
        <AdminSidebar />

        <div className="flex-1 min-w-0 flex flex-col">
          <DashboardTopbar actions={<TopbarActions />} />
          <DashboardMain>{children}</DashboardMain>
        </div>
      </div>
    </DashboardShell>
  );
}
