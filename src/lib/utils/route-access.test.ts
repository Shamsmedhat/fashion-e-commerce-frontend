import { describe, expect, it } from "vitest";

import { isAuthPath, isProtectedPath, splitLocale } from "./route-access";

const locales = ["en", "ar"] as const;

describe("splitLocale", () => {
  it("separates the locale prefix from the path", () => {
    expect(splitLocale("/en/bag", locales)).toEqual({ locale: "en", path: "/bag" });
    expect(splitLocale("/ar", locales)).toEqual({ locale: "ar", path: "/" });
    expect(splitLocale("/bag/", locales)).toEqual({ locale: null, path: "/bag" });
    expect(splitLocale("/", locales)).toEqual({ locale: null, path: "/" });
  });

  it("does not mistake a path that merely starts with a locale code", () => {
    expect(splitLocale("/enrol", locales)).toEqual({ locale: null, path: "/enrol" });
  });
});

describe("isProtectedPath", () => {
  it("protects the bag and every checkout page, with or without a locale", () => {
    for (const path of ["/bag", "/en/bag", "/ar/checkout", "/en/checkout/success", "/EN/Bag/"]) {
      expect(isProtectedPath(path, locales), path).toBe(true);
    }
  });

  // Regression: every page that was not explicitly public was protected, so a mistyped or
  // removed URL redirected anonymous visitors to the login form instead of the 404 page.
  it("leaves the shop and unknown pages public", () => {
    for (const path of [
      "/",
      "/en",
      "/en/new",
      "/ar/category/men/123",
      "/en/products/1",
      "/en/store-locator",
      "/baggage",
    ]) {
      expect(isProtectedPath(path, locales), path).toBe(false);
    }
  });
});

describe("isAuthPath", () => {
  it("recognises the login and registration pages only", () => {
    expect(isAuthPath("/en/auth/login", locales)).toBe(true);
    expect(isAuthPath("/auth/register/", locales)).toBe(true);
    expect(isAuthPath("/en/auth", locales)).toBe(false);
    expect(isAuthPath("/en/new", locales)).toBe(false);
  });
});
