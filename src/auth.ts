import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";
import { LoginResponse } from "./lib/types/auth";
import { AppError } from "./lib/utils/app-errors";
import { handleRateLimitError } from "./lib/utils/rate-limit-error";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        phone: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Request body
        const requestBody: {
          email?: string;
          phone?: string;
          password: string;
        } = {
          password: credentials?.password || "",
        };

        if (credentials?.phone) {
          requestBody.phone = credentials.phone;
        } else if (credentials?.email) {
          requestBody.email = credentials.email;
        }

        // Fetch
        const response = await fetch(`${process.env.API_URL}/users/login`, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            ...JSON_HEADER,
          },
        });

        handleRateLimitError(response);

        const data: LoginResponse | ErrorResponse = await response.json().catch(() => ({
          status: "error" as const,
          message: "Authentication failed",
        }));

        // Error handling
        if (!response.ok) {
          const message = typeof data.status === "string" ? data.message : "Authentication failed";
          throw new AppError(message, 401, "authentication");
        }

        const payload = data as LoginResponse;

        if (!payload.data || !payload.data.user || !payload.token) {
          throw new AppError("Invalid response from server", 401, "authentication");
        }

        // Return user
        return {
          id: payload.data.user._id,
          user: payload.data.user,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }): JWT => {
      // Persist user data into token on first login
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },
    session: ({ session, token }): Session => {
      // Expose user from token to session
      session.user = token.user;

      return session;
    },
  },
};
