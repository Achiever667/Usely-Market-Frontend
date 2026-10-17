import type { AuthUser } from "@/types/auth";

export function onboardingGuard(user: AuthUser | null) {
  return {
    allowed: Boolean(user?.onboardingComplete),
    redirectTo: "/onboarding",
  };
}
