"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AuthState } from "@/features/auth/types/auth.types";
import type { AuthSession, AuthUser } from "@/types/auth";

type AuthActions = {
  setSession: (session: AuthSession) => void;
  setUser: (user: AuthUser | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  setStatus: (status: AuthState["status"]) => void;
  clearSession: () => void;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,
      setSession: (session) =>
        set({
          user: session.user,
          accessToken: session.accessToken,
          status: "authenticated",
        }),
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setStatus: (status) => set({ status }),
      clearSession: () =>
        set({
          user: null,
          accessToken: null,
          status: "anonymous",
        }),
    }),
    {
      name: "usely-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        status: state.status,
      }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const selectAuthUser = (state: AuthState) => state.user;
export const selectAccessToken = (state: AuthState) => state.accessToken;
export const selectIsAuthenticated = (state: AuthState) => state.status === "authenticated";
