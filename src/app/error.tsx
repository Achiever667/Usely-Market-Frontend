"use client";

import { ErrorState } from "@/components/shared/error-state";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background p-6">
      <ErrorState description="The application hit an unexpected state." onRetry={reset} />
    </main>
  );
}
