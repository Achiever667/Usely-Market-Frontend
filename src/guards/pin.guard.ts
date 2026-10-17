import type { AuthUser } from "@/types/auth";

export function pinGuard(user: AuthUser | null) {
  return {
    allowed: Boolean(user?.hasPin),
    redirectTo: "/security/pin",
  };
}
