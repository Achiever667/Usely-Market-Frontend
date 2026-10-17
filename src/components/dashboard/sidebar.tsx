'use client';

/**
 * Reusable Dashboard Sidebar primitives — ShadCN-style composable API.
 *
 * Usage:
 *   <Sidebar>
 *     <SidebarHeader>…</SidebarHeader>
 *     <SidebarContent>
 *       <SidebarGroup label="Main">
 *         <SidebarMenu>
 *           <SidebarMenuItem icon="home" label="Dashboard" href="/admin" />
 *           <SidebarMenuCollapsible icon="package" label="Products">
 *             <SidebarMenuSub href="/admin/products/new">Add New</SidebarMenuSub>
 *             <SidebarMenuSub href="/admin/products">List</SidebarMenuSub>
 *           </SidebarMenuCollapsible>
 *         </SidebarMenu>
 *       </SidebarGroup>
 *     </SidebarContent>
 *     <SidebarFooter>…</SidebarFooter>
 *   </Sidebar>
 */

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { UiIcon } from '@/components/ui/icon';
import type { IconName } from '@/components/ui/icon';
import { useSidebar } from './sidebar-context';

/* ─────────────────────────────────────────────────────────────────────────────
   Root Sidebar
   · Desktop: sticky column that hugs the top of the viewport and stays
     fixed while the main content column scrolls independently.
   · Mobile: full-height overlay sliding in from the left.
───────────────────────────────────────────────────────────────────────────── */

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { open, isMobile, setOpen } = useSidebar();

  return (
    <>
      {/* ── Mobile backdrop ────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar panel ──────────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.aside
            key="sidebar"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className={cn(
              'flex flex-col bg-sidebar border-r border-border/60 overflow-hidden',
              isMobile
                // Mobile: full-height overlay, not part of flow
                ? 'fixed inset-y-0 left-0 z-50 w-[280px] shadow-2xl'
                // Desktop: sticky so it never scrolls with the page.
                // h-dvh keeps it viewport-tall; top-0 pins it.
                : 'sticky top-0 h-dvh w-[260px] shrink-0'
            )}
            aria-label="Primary navigation"
          >
            {children}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sidebar sub-components
───────────────────────────────────────────────────────────────────────────── */

export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-5 border-b border-border/40">
      {children}
    </div>
  );
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return (
    // flex-1 + overflow-y-auto = the ONLY scrollable region inside the sidebar.
    // The sidebar panel itself does not scroll.
    <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
      {children}
    </div>
  );
}

export function SidebarFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="shrink-0 border-t border-border/40 px-3 py-4">
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Group / Label
───────────────────────────────────────────────────────────────────────────── */

export function SidebarGroup({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2">
      {label && (
        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 select-none">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Menu list wrapper
───────────────────────────────────────────────────────────────────────────── */

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-0.5">{children}</ul>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Single nav item
   Active:  success text + success/10 bg pill + success/15 icon chip
   Hover:   muted bg + icon chips gets success/10 bg + success icon color
───────────────────────────────────────────────────────────────────────────── */

export interface SidebarMenuItemProps {
  icon?: IconName;
  label: string;
  href?: string;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

export function SidebarMenuItem({
  icon,
  label,
  href,
  active,
  badge,
  onClick,
}: SidebarMenuItemProps) {
  const { isMobile, setOpen } = useSidebar();

  const handleClick = () => {
    if (isMobile) setOpen(false);
    onClick?.();
  };

  const inner = (
    <span
      className={cn(
        'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5',
        'text-sm font-medium transition-all duration-150',
        active
          ? 'bg-success-500/10 text-success-600 font-semibold shadow-sm dark:text-success-400'
          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
      )}
    >
      {icon && (
        <span
          className={cn(
            'flex size-[30px] shrink-0 items-center justify-center rounded-lg transition-all duration-150',
            active
              ? 'bg-success-500/15 text-success-600 dark:text-success-400'
              : 'bg-transparent text-muted-foreground group-hover:bg-success-500/10 group-hover:text-success-600 dark:group-hover:text-success-400'
          )}
        >
          <UiIcon name={icon} size={16} />
        </span>
      )}
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && (
        <span className="ml-auto shrink-0 rounded-full bg-success-500/15 px-2 py-0.5 text-[11px] font-semibold text-success-600 dark:text-success-400">
          {badge}
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <li>
        <Link
          href={href}
          onClick={handleClick}
          className="block outline-none focus-visible:ring-2 focus-visible:ring-success-500/40 rounded-xl"
        >
          {inner}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        className="w-full outline-none focus-visible:ring-2 focus-visible:ring-success-500/40 rounded-xl"
      >
        {inner}
      </button>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Collapsible nav item with children
   Expanded: success icon chip; hover: success icon chip
───────────────────────────────────────────────────────────────────────────── */

export interface SidebarMenuCollapsibleProps {
  icon?: IconName;
  label: string;
  badge?: string | number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function SidebarMenuCollapsible({
  icon,
  label,
  badge,
  defaultOpen = false,
  children,
}: SidebarMenuCollapsibleProps) {
  const [expanded, setExpanded] = React.useState(defaultOpen);

  return (
    <li>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5',
          'text-sm font-medium transition-all duration-150',
          'outline-none focus-visible:ring-2 focus-visible:ring-success-500/40',
          expanded
            ? 'text-foreground'
            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
        )}
      >
        {icon && (
          <span
            className={cn(
              'flex size-[30px] shrink-0 items-center justify-center rounded-lg transition-all duration-150',
              expanded
                ? 'bg-success-500/10 text-success-600 dark:text-success-400'
                : 'bg-transparent text-muted-foreground group-hover:bg-success-500/10 group-hover:text-success-600 dark:group-hover:text-success-400'
            )}
          >
            <UiIcon name={icon} size={16} />
          </span>
        )}
        <span className="flex-1 truncate text-left">{label}</span>
        {badge !== undefined && (
          <span className="shrink-0 rounded-full bg-success-500/15 px-2 py-0.5 text-[11px] font-semibold text-success-600 dark:text-success-400">
            {badge}
          </span>
        )}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-muted-foreground"
        >
          <UiIcon name="chevron-down" size={14} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            key="sub"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="ml-4 mt-0.5 border-l border-border/50 pl-3 pb-1 flex flex-col gap-0.5">
              {children}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sub menu item (child of SidebarMenuCollapsible)
   Active: success text; hover: success text
───────────────────────────────────────────────────────────────────────────── */

export interface SidebarMenuSubProps {
  href?: string;
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function SidebarMenuSub({ href, active, children, onClick }: SidebarMenuSubProps) {
  const { isMobile, setOpen } = useSidebar();

  const handleClick = () => {
    if (isMobile) setOpen(false);
    onClick?.();
  };

  const inner = (
    <span
      className={cn(
        'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-150',
        active
          ? 'text-success-600 font-semibold bg-success-500/10 dark:text-success-400'
          : 'text-muted-foreground hover:bg-muted/50 hover:text-success-600 dark:hover:text-success-400'
      )}
    >
      <span
        className={cn(
          'size-1.5 shrink-0 rounded-full transition-colors',
          active ? 'bg-success-500' : 'bg-current opacity-40'
        )}
      />
      {children}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-success-500/40 rounded-lg"
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full outline-none focus-visible:ring-2 focus-visible:ring-success-500/40 rounded-lg"
    >
      {inner}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sidebar Trigger (Hamburger — place in topbar)
───────────────────────────────────────────────────────────────────────────── */

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggle, open } = useSidebar();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={open ? 'Close navigation' : 'Open navigation'}
      aria-expanded={open}
      className={cn(
        'flex size-9 items-center justify-center rounded-lg',
        'text-muted-foreground transition-colors',
        'hover:bg-muted hover:text-foreground',
        'outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={open ? 'close' : 'open'}
          initial={{ opacity: 0, rotate: open ? -90 : 90, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: open ? 90 : -90, scale: 0.7 }}
          transition={{ duration: 0.18 }}
          className="flex items-center justify-center"
        >
          <UiIcon name={open ? 'x' : 'menu'} size={18} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sidebar Separator
───────────────────────────────────────────────────────────────────────────── */

export function SidebarSeparator() {
  return <div className="my-2 h-px bg-border/50" />;
}
