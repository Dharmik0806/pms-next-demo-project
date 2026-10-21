// Entry point: connect to MongoDB first, then start listening.
import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

async function start() {
  try {
    await connectDB();
    app.listen(env.port, () => {
      console.log(`🚀 API running on http://localhost:${env.port}/api`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();
