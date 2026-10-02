// Pages that need a logged-in shopper. Everything else is public, so an unknown URL reaches
// the 404 page instead of being bounced to the login form.
const PROTECTED_PAGES = ["/bag", "/checkout"];

// Pages a logged-in shopper has no reason to see.
const AUTH_PAGES = ["/auth/login", "/auth/register"];

// "/en/bag" -> { locale: "en", path: "/bag" }; "/bag" -> { locale: null, path: "/bag" }
export function splitLocale(
  pathname: string,
  locales: readonly string[],
): { locale: string | null; path: string } {
  const [, first = "", ...rest] = pathname.split("/");
  const locale = locales.find((candidate) => candidate === first.toLowerCase()) ?? null;
  const path = locale ? `/${rest.join("/")}` : pathname;

  return { locale, path: path.replace(/\/+$/, "") || "/" };
}

const matches = (path: string, pages: string[]): boolean =>
  pages.some((page) => path === page || path.startsWith(`${page}/`));

export function isProtectedPath(pathname: string, locales: readonly string[]): boolean {
  return matches(splitLocale(pathname, locales).path.toLowerCase(), PROTECTED_PAGES);
}

export function isAuthPath(pathname: string, locales: readonly string[]): boolean {
  return matches(splitLocale(pathname, locales).path.toLowerCase(), AUTH_PAGES);
}
