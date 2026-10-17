import Link from 'next/link';

import { UiDarkModeSwitch, UiIcon, type IconName } from '@/components/ui';

export default function Home() {
  return (
    <main className="min-h-dvh bg-background font-sans text-foreground">
      <section className="mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        {/* HERO BADGE */}
        <div className="inline-flex capitalize items-center gap-2 rounded-lg border border-border max-w-sm bg-card px-3 py-1 text-caption text-muted-foreground shadow-xs">
          <UiIcon name="shield-check" className="size-4 text-success-600" />
          Secure & fast Rental commerce foundation
        </div>

        {/* HERO TEXT */}
        <div className="mt-6 space-y-5">
          <h1 className="text-h1 font-bold tracking-tight">Usely Market</h1>

          <p className="max-w-2xl text-body leading-7 text-muted-foreground">
            A scalable marketplace foundation with guarded routes, GraphQL data
            access, typed forms, reusable design primitives, and feature-owned
            business logic.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/marketplace"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-success-600 px-5 text-sm font-medium text-white transition-all hover:bg-success-600/90 shadow-sm"
          >
            Browse marketplace
            <UiIcon name="arrow-right" className="size-4" />
          </Link>

          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Vendor sign in
          </Link>
        </div>

        <div className="mt-5">
          <UiDarkModeSwitch />
        </div>

        {/* FEATURE GRID */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {([
            {
              icon: 'store',
              title: 'Feature owned',
              text: 'Products, auth, cart, orders, vendors, and settings evolve independently.',
            },
            {
              icon: 'trending-up',
              title: 'Query driven',
              text: 'TanStack Query owns API cache while Zustand stays focused on client state.',
            },
            {
              icon: 'shield-check',
              title: 'Guarded by default',
              text: 'Middleware and client guards protect route access and role boundaries.',
            },
          ] satisfies Array<{ icon: IconName; title: string; text: string }>).map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6 shadow-xs transition hover:border-success-600/30"
            >
              <UiIcon name={item.icon} className="mb-4 size-5 text-success-600" />

              <h2 className="text-title font-semibold">{item.title}</h2>

              <p className="mt-2 text-caption leading-6 text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
