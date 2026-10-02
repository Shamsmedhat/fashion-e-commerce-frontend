import { describe, expect, it } from "vitest";

import { getJwtExpiry, isBackendTokenExpired } from "./backend-token";

const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
const jwt = (payload: object) => `${encode({ alg: "HS256" })}.${encode(payload)}.signature`;

describe("getJwtExpiry", () => {
  it("reads the exp claim as milliseconds", () => {
    expect(getJwtExpiry(jwt({ id: "u1", exp: 1_800_000_000 }))).toBe(1_800_000_000_000);
  });

  it("returns null for tokens without a usable expiry", () => {
    expect(getJwtExpiry(jwt({ id: "u1" }))).toBeNull();
    expect(getJwtExpiry("not-a-jwt")).toBeNull();
    expect(getJwtExpiry("")).toBeNull();
  });
});

describe("isBackendTokenExpired", () => {
  const now = 1_000_000;

  it("is true once the expiry has passed", () => {
    expect(isBackendTokenExpired({ tokenExpiresAt: now - 1 }, now)).toBe(true);
    expect(isBackendTokenExpired({ tokenExpiresAt: now }, now)).toBe(true);
  });

  it("is false while the token is still valid", () => {
    expect(isBackendTokenExpired({ tokenExpiresAt: now + 60_000 }, now)).toBe(false);
  });

  it("does not sign out sessions that have no recorded expiry", () => {
    expect(isBackendTokenExpired({}, now)).toBe(false);
    expect(isBackendTokenExpired(null, now)).toBe(false);
  });
});
