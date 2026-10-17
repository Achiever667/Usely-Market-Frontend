import type { AuthUser } from "@/types/auth";

export function guestGuard(user: AuthUser | null) {
  return {
    allowed: !user,
    redirectTo: "/marketplace",
  };
}
