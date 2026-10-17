"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { authGuard } from "@/guards/auth.guard";
import { guestGuard } from "@/guards/guest.guard";
import { onboardingGuard } from "@/guards/onboarding.guard";
import { pinGuard } from "@/guards/pin.guard";
import { roleGuard, verifiedGuard } from "@/guards/role.guard";
import { subscriptionGuard } from "@/guards/subscription.guard";
import { useAuthStore } from "@/features/auth/store/auth.store";
import type { AuthUser } from "@/types/auth";

export type GuardKey =
  | "auth"
  | "guest"
  | "verified"
  | "vendor"
  | "admin"
  | "withPin"
  | "onboarding"
  | "subscription";

type GuardResult = {
  allowed: boolean;
  redirectTo: string;
};

type GuardProps = {
  check: GuardKey[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

const guardRegistry: Record<GuardKey, (user: AuthUser | null) => GuardResult> = {
  auth: authGuard,
  guest: guestGuard,
  verified: verifiedGuard,
  vendor: (user) => roleGuard(user, "vendor"),
  admin: guestGuard,
  // admin: (user) => roleGuard(user, "admin"),
  withPin: pinGuard,
  onboarding: onboardingGuard,
  subscription: subscriptionGuard,
};

export function Guard({ check, children, fallback = null }: GuardProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);

  const failedGuard = React.useMemo(
    () => check.map((guard) => guardRegistry[guard](user)).find((result) => !result.allowed),
    [check, user],
  );

  React.useEffect(() => {
    if (status === "idle") return;

    if (failedGuard) {
      router.replace(failedGuard.redirectTo);
    }
  }, [failedGuard, router, status]);

  if (status === "idle" || failedGuard) {
    return fallback;
  }

  return children;
}
