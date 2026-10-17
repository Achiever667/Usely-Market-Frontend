'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { SidebarProvider, useSidebar } from './sidebar-context';
import { SidebarTrigger } from './sidebar';
import { UiButton } from '@/components/ui/button';
import { UiIcon } from '@/components/ui/icon';
import { UiDarkModeSwitch } from '@/components/ui/dark-mode-switch';
import { UiInput } from '../ui';

/* ─────────────────────────────────────────────────────────────────────────────
   DashboardShell — top-level wrapper; owns the SidebarProvider
───────────────────────────────────────────────────────────────────────────── */

type ShellProps = { children: ReactNode };

export function DashboardShell({ children }: ShellProps) {
  return (
    <SidebarProvider>
      <div className="min-h-dvh bg-background text-foreground">
        {children}
      </div>
    </SidebarProvider>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DashboardLayout — flex row that holds sidebar + main
   Must be a child of DashboardShell (needs SidebarProvider in context)
───────────────────────────────────────────────────────────────────────────── */

function DashboardLayoutInner({ children }: { children: ReactNode }) {
  const { open, isMobile } = useSidebar();

  return (
    <div className="flex min-h-dvh">
      {/* Sidebar renders itself via AnimatePresence — just include it here */}
      {children}
    </div>
  );
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardLayoutInner>{children}</DashboardLayoutInner>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   DashboardMain — the scrollable content column
───────────────────────────────────────────────────────────────────────────── */

export function DashboardMain({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 min-w-0 flex-col">
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DashboardTopbar — sticky header with hamburger + breadcrumb area + actions
───────────────────────────────────────────────────────────────────────────── */

export function DashboardTopbar({
  title,
  subtitle,
  actions,
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur-md lg:px-6">
      {/* Hamburger — visible always so user can toggle on any viewport */}
      <SidebarTrigger />

      {/* Vertical divider */}
      <span className="h-5 w-px bg-border/70 shrink-0" aria-hidden="true" />

      {/* Search input replaces title/subtitle */}
      <div className="flex flex-1 min-w-0">
        <div className="flex-1">
          <div className="relative max-w-xl">
            <UiInput
              type="search"
              placeholder="Search…"
              aria-label="Search"
              className="w-full "
            />
          </div>
        </div>
      </div>

      {/* Right-side actions: notifications, dark-mode, and optional actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* <UiButton variant="ghost" size="icon" aria-label="Notifications">
          <UiIcon name="mail" />
        </UiButton> */}

        <UiDarkModeSwitch size='sm'  />

        {/* <UiButton variant="ghost" size="icon" aria-label="User menu">
          <div className="relative size-8 overflow-hidden rounded-full">
            <Image src="/images/auth/logo.png" alt="avatar" fill className="object-cover" />
          </div>
        </UiButton> */}

        {actions}
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DashboardContent — padded scrollable body
───────────────────────────────────────────────────────────────────────────── */

export function DashboardContent({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 px-4 py-6 lg:px-6">
      {children}
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DashboardPageHeader — section-level title + actions row
───────────────────────────────────────────────────────────────────────────── */

export function DashboardPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold leading-tight">{title}</h2>
        {description && (
          <p className="mt-0.5 text-body text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2 mt-2 sm:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Legacy shims (kept so existing import paths don't break while migrating)
───────────────────────────────────────────────────────────────────────────── */

/** @deprecated Use DashboardTopbar instead */
export function DashboardHeader({
  title,
  subtitle,
  onOpenMobileMenu,
}: {
  title?: string;
  subtitle?: string;
  onOpenMobileMenu?: () => void;
}) {
  return (
    <DashboardTopbar title={title} subtitle={subtitle} />
  );
}

/** @deprecated Sidebar is now self-contained — wrap with <Sidebar> from sidebar.tsx */
export function DashboardSidebar({ children }: { children?: ReactNode }) {
  return null;
}

/** @deprecated Mobile sidebar is now handled inside <Sidebar> automatically */
export function DashboardMobileSidebar({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}) {
  return null;
}
