import { authApi } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import type {
  CheckEmailInput,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "@/features/auth/types/auth.types";
import { tokenManager } from "@/features/auth/utils/token-manager";

export const authService = {
  checkEmail(input: CheckEmailInput) {
    return authApi.checkEmail(input);
  },
  async login(input: LoginInput) {
    const session = await authApi.login(input);
    useAuthStore.getState().setSession(session);
    tokenManager.setAccessToken(session.accessToken);
    return session;
  },
  async register(input: RegisterInput) {
    const session = await authApi.register(input);
    useAuthStore.getState().setSession(session);
    tokenManager.setAccessToken(session.accessToken);
    return session;
  },
  async refresh() {
    useAuthStore.getState().setStatus("refreshing");
    const session = await authApi.refresh();
    useAuthStore.getState().setSession(session);
    tokenManager.setAccessToken(session.accessToken);
    return session;
  },
  async logout() {
    try {
      await authApi.logout();
    } finally {
      tokenManager.clear();
    }
  },
  forgotPassword(input: ForgotPasswordInput) {
    return authApi.forgotPassword(input);
  },
  resetPassword(input: ResetPasswordInput) {
    return authApi.resetPassword(input);
  },
};
