import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAuthToken(): Promise<string | null> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  // Get the JWT token from cookies
  const cookieStore = await cookies();
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

    if (decoded && typeof decoded === "object" && "token" in decoded) {
      return decoded.token as string;
    }

    return null;
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    return null;
  }
}
