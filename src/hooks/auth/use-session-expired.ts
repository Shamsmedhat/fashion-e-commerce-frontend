"use client";

import { signOut } from "next-auth/react";
import { useLocale } from "next-intl";

import { usePathname } from "@/i18n/navigation";
import { AppError } from "@/lib/utils/app-errors";

// When the API no longer accepts the shopper's token, the storefront session is ended as well
// and the shopper is sent to the login page, to come back to where they were.
// (Just navigating to the login page would bounce: the middleware still sees a session there.)
export function useSessionExpired() {
  // Translations
  const locale = useLocale();

  // Navigation
  const pathname = usePathname();

  // Returns true when the error was an expired session and has been handled.
  function handleSessionExpired(error: unknown): boolean {
    if (!(error instanceof AppError) || !error.isAuthentication) return false;

    const callbackUrl = encodeURIComponent(`/${locale}${pathname}`);
    void signOut({ callbackUrl: `/${locale}/auth/login?callbackUrl=${callbackUrl}` });

    return true;
  }

  return { handleSessionExpired };
}
