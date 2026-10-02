// The storefront session (NextAuth cookie) wraps a JWT issued by the backend API. The two expire
// independently, so the session is treated as over once the backend token is.

// Reads the expiry (ms since epoch) from a JWT without verifying it — the API does the verifying.
export function getJwtExpiry(jwt: string): number | null {
  try {
    const [, payload] = jwt.split(".");
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp?: unknown;
    };

    return typeof exp === "number" ? exp * 1000 : null;
  } catch {
    return null;
  }
}

export function isBackendTokenExpired(
  session: { tokenExpiresAt?: number | null } | null | undefined,
  now: number = Date.now(),
): boolean {
  // Sessions created before the expiry was recorded have no value; the API still rejects them
  // when the time comes.
  if (!session?.tokenExpiresAt) return false;

  return session.tokenExpiresAt <= now;
}
