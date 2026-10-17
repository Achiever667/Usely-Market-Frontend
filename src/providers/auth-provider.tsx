"use client";

import * as React from "react";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { tokenManager } from "@/features/auth/utils/token-manager";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setStatus = useAuthStore((state) => state.setStatus);

  React.useEffect(() => {
    tokenManager.setAccessToken(accessToken);
    setStatus(accessToken ? "authenticated" : "anonymous");
  }, [accessToken, setStatus]);

  return children;
}
