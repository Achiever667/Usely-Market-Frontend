export const APP_NAME = "Usely Market";
export const DEFAULT_LOCALE = "en";
export const AUTH_COOKIE_NAME = "usely_access_token";
export const REFRESH_COOKIE_NAME = "usely_refresh_token";

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  marketplace: "/marketplace",
  cart: "/cart",
  vendor: "/vendor",
  admin: "/dashboard",
  onboarding: "/onboarding",
} as const;
