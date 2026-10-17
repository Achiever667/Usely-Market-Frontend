import type * as React from "react";

import { MainNav } from "@/components/navigation/main-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <MainNav />
      <main className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-4 sm:py-8 md:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
