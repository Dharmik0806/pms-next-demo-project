// Helpers to create and verify JSON Web Tokens (JWT).
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export interface TokenPayload {
  id: string;
  role: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
  });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, env.jwtSecret) as TokenPayload;
}
