// `protect` → blocks requests that have no valid JWT.
// `restrictTo` → allows only certain roles (e.g. admin).
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { verifyToken } from "../utils/token";
import { User, UserDoc } from "../models/User";

// Make `req.user` available with the right type in all controllers.
declare module "express-serve-static-core" {
  interface Request {
    user?: UserDoc;
  }
}

export async function protect(req: Request, _res: Response, next: NextFunction) {
  // Expected header →  Authorization: Bearer <token>
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) throw ApiError.unauthorized("Please log in to continue");

  let payload;
  try {
    payload = verifyToken(header.split(" ")[1]);
  } catch {
    throw ApiError.unauthorized("Session expired, please log in again");
  }

  const user = await User.findById(payload.id);
  if (!user || !user.isActive) throw ApiError.unauthorized("Account not found or disabled");

  req.user = user as unknown as UserDoc;
  next();
}

export const restrictTo =
  (...roles: string[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw ApiError.forbidden("You do not have permission to do this");
    }
    next();
  };
