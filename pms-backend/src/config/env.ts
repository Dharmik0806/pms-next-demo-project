// Loads variables from .env and exposes them as one typed object.
// Every other file imports `env` from here instead of using process.env directly.
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pms",
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  // Allow several origins separated by commas
  clientUrls: (process.env.CLIENT_URL || "http://localhost:3000")
    .split(",")
    .map((u) => u.trim()),
};

export const isProd = env.nodeEnv === "production";
