
declare module "next-auth" {
  interface Session extends UserSession {
    user: UserResponse;
  }

  interface Profile {
    user_id: string;
    given_name: string;
    family_name: string;
    email_verified: boolean;
    picture: string;
  }

  interface User {
    user: LoginUserType;
    session: UserSession;
  }

  interface Account {
    access_token: string;
    refresh_token: string;
  }
}

export type LoginUserType = {
  token: string;
  refresh: string;
  userInfo: UserResponse;
};

export type UserResponse = {
  id: string | number;
  email: string | undefined | null;
  name: string;
  roles: string[];
  imageUrl: string | null,
  organizationId: number,
  isEmployee: boolean,
  shopId: number
}

export interface UserSession {
  accessToken: string;
  refreshToken: string;
  provider: "credentials";
  accessTokenExpiresAt: number;
  error?: "RefreshAccessTokenError";
}

declare module "next-auth/jwt" {
  interface JWT extends UserSession {
    user: UserResponse;
  }
}
