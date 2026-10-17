// import type { AuthUser } from "@/types/auth";

// export function authGuard(user: AuthUser | null) {
//   return {
//     allowed: Boolean(user),
//     redirectTo: "/login",
//   };
// }

import type { AuthUser } from "@/types/auth";

export function authGuard(user: AuthUser | null) {
  return {
    allowed: !user,
    redirectTo: "/marketplace",
  };
}
