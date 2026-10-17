import { useAuthStore } from "@/features/auth/store/auth.store";

let inMemoryAccessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

export const tokenManager = {
  getAccessToken() {
    return inMemoryAccessToken ?? useAuthStore.getState().accessToken;
  },
  setAccessToken(token: string | null) {
    inMemoryAccessToken = token;
    useAuthStore.getState().setAccessToken(token);
  },
  clear() {
    inMemoryAccessToken = null;
    useAuthStore.getState().clearSession();
  },
  async refresh(refresher: () => Promise<string | null>) {
    refreshPromise ??= refresher().finally(() => {
      refreshPromise = null;
    });

    const token = await refreshPromise;
    this.setAccessToken(token);
    return token;
  },
};
