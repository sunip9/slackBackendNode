export interface JwtPayload {
  id: number;
  email: string;
}

export interface AuthTokens {
  accessToken: string;
}

export interface SignUpInput {
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}
