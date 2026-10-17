import Link from "next/link";

import { UiButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="max-w-md text-sm leading-6 text-muted-foreground">
        The page may have moved or the marketplace is not available.
      </p>
      <UiButton asChild>
        <Link href="/">Go home</Link>
      </UiButton>
    </main>
  );
}
