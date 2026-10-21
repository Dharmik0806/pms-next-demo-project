// Last middleware in the chain: converts every error into a clean JSON response.
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { isProd } from "../config/env";

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  let status = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  // Mongoose: duplicate unique field (e.g. e-mail already used)
  if (err.code === 11000) {
    status = 409;
    message = `${Object.keys(err.keyValue || {})[0] || "Value"} already exists`;
  }
  // Mongoose: invalid ObjectId
  if (err.name === "CastError") {
    status = 400;
    message = "Invalid id";
  }
  // Mongoose: schema validation
  if (err.name === "ValidationError") {
    status = 400;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message = Object.values(err.errors).map((e: any) => e.message).join(", ");
  }

  if (status >= 500) console.error(err);

  res.status(status).json({
    success: false,
    message,
    ...(isProd ? {} : { stack: err.stack }),
  });
}
