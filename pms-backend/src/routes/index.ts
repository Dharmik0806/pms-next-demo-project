// Combines all route files under one router. app.ts mounts this at /api.
import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import projectRoutes from "./project.routes";

const router = Router();

router.get("/health", (_req, res) => res.json({ success: true, message: "PMS API is running" }));
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);

export default router;
