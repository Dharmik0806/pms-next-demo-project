// Runs after express-validator rules and returns the first error as a 400 response.
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError";

export function validate(req: Request, _res: Response, next: NextFunction) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const first = result.array()[0];
  throw ApiError.badRequest(String(first.msg));
}
