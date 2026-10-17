export type UserRole = "customer" | "vendor" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  isVerified: boolean;
  hasPin: boolean;
  onboardingComplete: boolean;
  subscriptionActive: boolean;
  avatarUrl?: string;
};

export type AuthSession = {
  accessToken: string;
  user: AuthUser;
};
