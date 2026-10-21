// Builds the Express application (middleware + routes).
// It does NOT start listening — server.ts does that. This keeps app easy to test.
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env, isProd } from "./config/env";
import routes from "./routes";
import { errorHandler, notFound } from "./middleware/error.middleware";

const app = express();

// Security headers
app.use(helmet());

// Allow the Next.js frontend to call this API from the browser
app.use(cors({ origin: env.clientUrls, credentials: true }));

// Parse JSON bodies (limit protects against huge payloads)
app.use(express.json({ limit: "1mb" }));

// Request logging
app.use(morgan(isProd ? "combined" : "dev"));

// Basic brute-force protection on the auth routes
app.use(
  "/api/auth",
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: true, legacyHeaders: false })
);

// All API routes live under /api
app.use("/api", routes);

// 404 + error handlers MUST be last
app.use(notFound);
app.use(errorHandler);

export default app;
