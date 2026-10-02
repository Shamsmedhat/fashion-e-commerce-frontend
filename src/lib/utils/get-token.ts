import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

import { isBackendTokenExpired } from "./backend-token";

export async function getAuthToken(): Promise<string | null> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  // Get the JWT token from cookies
  const cookieStore = cookies();
  const tokenCookie =
    cookieStore.get("next-auth.session-token") ||
    cookieStore.get("__Secure-next-auth.session-token");

  if (!tokenCookie?.value) {
    return null;
  }

  try {
    // Decode the JWT token to get the auth token
    const decoded = await decode({
      token: tokenCookie.value,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    // An expired API token counts as no token, so callers ask the shopper to log in again.
    if (decoded && typeof decoded.token === "string" && !isBackendTokenExpired(decoded)) {
      return decoded.token;
    }

    return null;
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    return null;
  }
}
