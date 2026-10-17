"use client";

import * as React from "react";
import Image from "next/image";

// Layout primitives
import {
  DashboardShell,
  DashboardMain,
  DashboardTopbar,
  DashboardContent,
  DashboardPageHeader,
} from "@/components/dashboard/layout";

// New sidebar primitives
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";

// Dashboard widgets
import { StatsCard } from "@/components/dashboard/cards/StatsCard";
import { AnalyticsCard } from "@/components/dashboard/cards/AnalyticsCard";
import { RevenueOverview } from "@/components/dashboard/widgets/RevenueOverview";
import { TopProducts } from "@/components/dashboard/widgets/TopProducts";
import { RecentActivities } from "@/components/dashboard/widgets/RecentActivities";
import { QuickActions } from "@/components/dashboard/widgets/QuickActions";
import { SystemHealth } from "@/components/dashboard/widgets/SystemHealth";
import { DashboardTable } from "@/components/dashboard/table/DashboardTable";
import { UiButton } from "@/components/ui/button";
import { UiIcon } from "@/components/ui/icon";

/* ─────────────────────────────────────────────────────────────────────────────
   Nav configuration
───────────────────────────────────────────────────────────────────────────── */

const NAV_MAIN = [
  { icon: "dashboard" as const, label: "Dashboard", href: "/dashboard", active: true },
  {
    icon: "shopping-bag" as const,
    label: "Orders",
    href: "/dashboard/orders",
    badge: 12,
  },
  {
    icon: "package" as const,
    label: "Products",
    children: [
      { label: "Add New", href: "/dashboard/products/new", icon: "plus" as const },
      { label: "All Products", href: "/dashboard/products", icon: "list" as const },
      { label: "Categories", href: "/dashboard/products/categories", icon: "tag" as const },
      { label: "History", href: "/dashboard/products/history", icon: "history" as const },
    ],
  },
  { icon: "users" as const, label: "Users", href: "/dashboard/users" },
  { icon: "building" as const, label: "Vendors", href: "/dashboard/vendors" },
  { icon: "wallet" as const, label: "Finance", href: "/dashboard/finance" },
  { icon: "bar-chart" as const, label: "Analytics", href: "/dashboard/analytics" },
  { icon: "file-text" as const, label: "Reports", href: "/dashboard/reports" },
];

const NAV_SYSTEM = [
  { icon: "settings" as const, label: "Settings", href: "/dashboard/settings" },
  { icon: "shield-check" as const, label: "Security", href: "/dashboard/security" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Sidebar nav component
───────────────────────────────────────────────────────────────────────────── */

// AdminSidebar moved to components/dashboard/AdminSidebar.tsx

/* ─────────────────────────────────────────────────────────────────────────────
   Topbar actions
───────────────────────────────────────────────────────────────────────────── */

function TopbarActions() {
  return (
    <>
      <UiButton variant="ghost" size="icon" aria-label="Notifications" className="relative size-9">
        <UiIcon name="bell" size={18} />
        <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
      </UiButton>
      <UiButton variant="ghost" size="icon" aria-label="Search" className="size-9">
        <UiIcon name="search" size={18} />
      </UiButton>
      <div className="h-5 w-px bg-border/70 shrink-0" aria-hidden="true" />
      <div className="relative size-8 overflow-hidden rounded-full ring-1 ring-border/40 cursor-pointer">
        <Image
          src="/images/auth/logo.png"
          alt="avatar"
          fill
          className="object-cover"
        />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main dashboard
───────────────────────────────────────────────────────────────────────────── */

export default function AdminDashboard() {
  const stats = [
    { id: "s1", title: "Total Revenue", value: "$93,438", delta: 12.5, icon: "market" },
    { id: "s2", title: "Total Orders", value: "1,245", delta: 8.2, icon: "shopping-cart" },
    { id: "s3", title: "Total Users", value: "8,432", delta: 14.3, icon: "user" },
    { id: "s4", title: "Active Vendors", value: "428", delta: 11.7, icon: "store" },
  ];

  const products = [
    { id: "p1", name: "Wireless Headphones", price: 1299, sold: 1245, imageUrl: undefined },
    { id: "p2", name: "Running Shoes", price: 199, sold: 976, imageUrl: undefined },
    { id: "p3", name: "Smart Watch", price: 349, sold: 754, imageUrl: undefined },
  ];

  const activities = [
    {
      id: "a1",
      title: "New user registered",
      description: "jane.doe@example.com",
      timestamp: new Date().toISOString(),
      type: "user",
    },
    {
      id: "a2",
      title: "Order #ORD-1452 completed",
      description: "$1,249.00",
      timestamp: new Date().toISOString(),
      type: "order",
    },
  ];

  const tableCols = [
    { key: "order", header: "Order ID", render: (r: { order: string }) => r.order },
    { key: "customer", header: "Customer", render: (r: { customer: string }) => r.customer },
    { key: "total", header: "Total", render: (r: { total: number }) => `$${r.total}` },
  ];

  const tableData = [
    { order: "ORD-1452", customer: "Jane Doe", total: 1249 },
    { order: "ORD-1453", customer: "John Smith", total: 299 },
  ];

  return (
    <>
      <DashboardTopbar title="Admin Console" subtitle="Overview & metrics" actions={<TopbarActions />} />

      <DashboardContent>
        <DashboardPageHeader title="Overview" description="Here's what's happening with your store today." actions={<QuickActions />} />

        {/* Stats row */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map((s) => (
            <StatsCard key={s.id} title={s.title} value={s.value} delta={s.delta} icon={s.icon} />
          ))}
        </div>

        {/* Charts + side widgets */}
        <div className="grid gap-6 lg:grid-cols-12 mb-6">
          <div className="lg:col-span-8 space-y-6">
            <RevenueOverview />
            <AnalyticsCard title="Traffic" />
          </div>
          <div className="lg:col-span-4 space-y-4">
            <TopProducts products={products} />
            <SystemHealth />
          </div>
        </div>

        {/* Table + recent activity */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <DashboardTable title="Recent Orders" columns={tableCols} data={tableData} />
          </div>
          <div className="lg:col-span-4 space-y-4">
            <RecentActivities activities={activities} />
            <QuickActions />
          </div>
        </div>
      </DashboardContent>
    </>
  );
}
