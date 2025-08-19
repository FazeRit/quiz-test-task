export interface JwtPayload {
  sub: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface TokenValidationResult<T extends object> {
  isValid: boolean;
  payload?: T;
  error?: string;
}
