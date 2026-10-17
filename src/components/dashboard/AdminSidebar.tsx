"use client";

import * as React from "react";
import Image from "next/image";
import { UiButton } from "@/components/ui/button";
import { UiIcon } from "@/components/ui/icon";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuCollapsible,
  SidebarMenuSub,
  SidebarSeparator,
} from "@/components/dashboard/sidebar";

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

export function AdminSidebar() {
  return (
    <Sidebar>
      {/* Brand */}
      <SidebarHeader>
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative size-9 shrink-0 overflow-hidden rounded-xl ring-1 ring-border/40">
            <Image src="/images/logo.png" alt="Usely" fill className="object-contain" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-foreground leading-tight">Usely Market</div>
            <div className="truncate text-[11px] font-medium text-muted-foreground">Admin Console</div>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup label="Main">
          <SidebarMenu>
            {NAV_MAIN.map((item) =>
              item.children ? (
                <SidebarMenuCollapsible key={item.label} icon={item.icon} label={item.label}>
                  {item.children.map((child) => (
                    <SidebarMenuSub key={child.label} href={child.href}>
                      {child.label}
                    </SidebarMenuSub>
                  ))}
                </SidebarMenuCollapsible>
              ) : (
                <SidebarMenuItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  active={item.active}
                  badge={item.badge}
                />
              ),
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup label="System">
          <SidebarMenu>
            {NAV_SYSTEM.map((item) => (
              <SidebarMenuItem key={item.label} icon={item.icon} label={item.label} href={item.href} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* User footer */}
      <SidebarFooter>
        <div className="flex items-center gap-3">
          <div className="relative size-9 shrink-0 overflow-hidden rounded-full ring-1 ring-border/40">
            <Image src="/images/auth/logo.png" alt="avatar" fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="truncate text-sm font-semibold leading-tight">Admin User</div>
            <div className="truncate text-[11px] text-muted-foreground">admin@usely.com</div>
          </div>
          <UiButton variant="ghost" size="icon" aria-label="Sign out" className="size-8 shrink-0">
            <UiIcon name="log-out" size={15} />
          </UiButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
