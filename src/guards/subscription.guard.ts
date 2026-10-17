import type { AuthUser } from "@/types/auth";

export function subscriptionGuard(user: AuthUser | null) {
  return {
    allowed: Boolean(user?.subscriptionActive),
    redirectTo: "/billing",
  };
}
