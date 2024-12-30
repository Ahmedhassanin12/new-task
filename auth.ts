import type { LoginUserType } from "@/common/types/session.type";
import { ApiClient } from "@/lib/api/apiClient";
import { SignInValidationSchema } from "@/lib/validation";
import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


// assume we refresh token
async function refreshCredentialsAccessToken(refreshToken: string) { }

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const validateFields = SignInValidationSchema.safeParse(credentials);
        if (!validateFields.success) {
          return null;
        }
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        try {
          const res = await ApiClient.post<LoginUserType>("/yeshtery/token",
            { ...credentials, isEmployee: true },)
          return {
            id: String(res.data.userInfo.id),
            session: {
              accessToken: res.data.token,
              refreshToken: res.data.refresh,
              provider: "credentials",
              accessTokenExpiresAt: 0,
            },
            user: res.data,

          }
        } catch (error) {
          console.log(error);
          return null;
        }


      },

    }),
  ],
  callbacks: {
    async jwt(params) {
      const { user, account, trigger, session } = params;
      let { token } = params;
      if (trigger === "update") {
        token = { ...token, ...session };
      }
      const initialProvider = account?.provider;
      const isFirstCredentialsLogin = initialProvider === "credentials";
      if (isFirstCredentialsLogin) {
        token.provider = initialProvider;
      }

      // if (!isFirstCredentialsLogin && token?.provider === "credentials") {
      //   // already logged in
      //   if (token.accessTokenExpiresAt > Date.now()) {
      //     console.log("Valid Credentials Token");
      //   } else {
      //     console.log("Old Credentials Token! Attempting to refresh");
      //     const newToken = await refreshCredentialsAccessToken(
      //       token.refreshToken,
      //     );
      //     if (!newToken) {
      //       console.log("Bad Credentials Refresh Token");
      //       token.error = "RefreshAccessTokenError";
      //     } else {
      //       console.log("Got a new credentials Access Token");
      //       token.accessToken = newToken.token;
      //       token.accessTokenExpiresAt = newToken.tokenExpires;
      //       token.refreshToken = newToken.refreshToken;
      //     }
      //   }
      // }
      if (typeof user === 'object' && user !== null) {
        token.user = {
          id: user.user.userInfo.id,
          email: user.user.userInfo.email,
          name: user.user.userInfo.name,
          roles: user.user.userInfo.roles,
          imageUrl: user.user.userInfo.imageUrl,
          organizationId: user.user.userInfo.organizationId,
          isEmployee: user.user.userInfo.isEmployee,
          shopId: user.user.userInfo.shopId,
        };
        token.accessToken = user.session.accessToken;
        token.refreshToken = user.session.refreshToken;
        token.accessTokenExpiresAt = user.session.accessTokenExpiresAt;
      }
      return token;
    },
    async session({ token, session }) {
      session = { ...token, expires: session.expires } as Session;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/signin",
    signOut: "/signin",
  },
};