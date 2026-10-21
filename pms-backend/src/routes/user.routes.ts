import { Router } from "express";
import * as ctrl from "../controllers/user.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { roleRules } from "../validators/user.validator";

const router = Router();

// Every route below needs a logged-in user
router.use(protect);

router.get("/", ctrl.list);

// Only admins may change or remove accounts
router.patch("/:id/role", restrictTo("admin"), roleRules, validate, ctrl.updateRole);
router.patch("/:id/active", restrictTo("admin"), ctrl.setActive);
router.delete("/:id", restrictTo("admin"), ctrl.remove);

export default router;
