import { NextResponse, type NextRequest } from "next/server";

import { AUTH_COOKIE_NAME, DEFAULT_LOCALE, REFRESH_COOKIE_NAME } from "@/lib/constants";

const protectedRoutes = ["/account", "/cart", "/checkout", "/orders", "/vendor", "/dashboard"];
const guestRoutes = ["/login", "/register", "/forgot-password"];
const vendorRoutes = ["/vendor"];
const adminRoutes = ["/dashboard"];

function startsWithAny(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function applySecurityHeaders(response: NextResponse) {
  response.headers.set("x-frame-options", "DENY");
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
  response.headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("x-dns-prefetch-control", "on");
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(accessToken || refreshToken);
  // Dev-only bypass: allow loading the dashboard locally for design review
  const isLocalDevBypass = process.env.NODE_ENV !== "production" && request.nextUrl.hostname === "localhost";

  if (isLocalDevBypass && (pathname === "/dashboard" || pathname.startsWith("/dashboard/"))) {
    return applySecurityHeaders(NextResponse.next());
  }

  if (!pathname.startsWith(`/${DEFAULT_LOCALE}`) && pathname === "/") {
    const response = NextResponse.next();
    response.headers.set("x-usely-locale", DEFAULT_LOCALE);
    return applySecurityHeaders(response);
  }

  if (startsWithAny(pathname, protectedRoutes) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return applySecurityHeaders(NextResponse.redirect(loginUrl));
  }

  if (startsWithAny(pathname, guestRoutes) && isAuthenticated) {
    return applySecurityHeaders(NextResponse.redirect(new URL("/marketplace", request.url)));
  }

  if (startsWithAny(pathname, [...vendorRoutes, ...adminRoutes]) && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return applySecurityHeaders(NextResponse.redirect(loginUrl));
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
