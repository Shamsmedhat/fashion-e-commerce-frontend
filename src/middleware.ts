import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";
import { isBackendTokenExpired } from "./lib/utils/backend-token";
import { isAuthPath, isProtectedPath, splitLocale } from "./lib/utils/route-access";

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // The session only counts while the API token inside it is still valid.
  const token = await getToken({ req });
  const isAuthenticated = token != null && !isBackendTokenExpired(token);

  const locale = splitLocale(pathname, routing.locales).locale ?? routing.defaultLocale;

  // Logged-in shoppers have no use for the login and registration pages
  if (isAuthenticated && isAuthPath(pathname, routing.locales)) {
    return NextResponse.redirect(new URL(`/${locale}`, req.nextUrl.origin));
  }

  // The bag and checkout need a session; the shopper returns to the same page after logging in
  if (!isAuthenticated && isProtectedPath(pathname, routing.locales)) {
    const loginUrl = new URL(`/${locale}/auth/login`, req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
