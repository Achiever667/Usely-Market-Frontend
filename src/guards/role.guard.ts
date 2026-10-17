import type { UserRole, AuthUser } from "@/types/auth";

export function roleGuard(user: AuthUser | null, role: UserRole) {
  return {
    allowed: Boolean(user?.roles.includes(role)),
    redirectTo: "/marketplace",
  };
}

export function verifiedGuard(user: AuthUser | null) {
  return {
    allowed: Boolean(user?.isVerified),
    redirectTo: "/verify-email",
  };
}
