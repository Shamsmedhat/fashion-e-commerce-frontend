import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";
import { LoginResponse } from "./lib/types/auth";
import { AuthenticationError } from "./lib/utils/app-errors";

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
        // Determine the request body based on whether phone or email is provided
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

        const response = await fetch(`${process.env.API_URL}/users/login`, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload: LoginResponse | APIResponse<never> = await response.json();

        // Throw an auth error if the login has failed
        if ("code" in payload) {
          throw new AuthenticationError(payload.message);
        }

        // Check if response has the expected structure
        if (!payload.data || !payload.data.user || !payload.token) {
          throw new AuthenticationError("Invalid response from server");
        }

        // Return the user to be encoded using JWT callback
        return {
          id: payload.data.user._id,
          user: payload.data.user,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // If the user exists it was a successful login attempt, so save the new user data in the cookies
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      // Decode the user data from the token cookie and store it in the session object
      session.user = token.user;

      return session;
    },
  },
};
