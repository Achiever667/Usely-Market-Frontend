import type { AuthSession, AuthUser } from "@/types/auth";

export type LoginInput = {
  email: string;
  password: string;
};

export type CheckEmailInput = {
  email: string;
};

export type CheckEmailResult = {
  exists: boolean;
  registrationType?: string | null;
};

export type RegisterInput = {
  name?: string;
  last_name: string;
  email: string;
  password: string;
};

export type ForgotPasswordInput = {
  email: string;
};

export type ResetPasswordInput = {
  email: string;
  code: string;
  password: string;
};

export type AuthResponse = AuthSession;

export type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  status: "idle" | "authenticated" | "anonymous" | "refreshing";
};
