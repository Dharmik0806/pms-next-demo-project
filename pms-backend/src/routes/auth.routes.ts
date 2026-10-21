import { Router } from "express";
import * as ctrl from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { loginRules, passwordRules, profileRules, registerRules } from "../validators/auth.validator";

const router = Router();

// Public
router.post("/register", registerRules, validate, ctrl.register);
router.post("/login", loginRules, validate, ctrl.login);

// Private (need a token)
router.get("/me", protect, ctrl.me);
router.patch("/me", protect, profileRules, validate, ctrl.updateMe);
router.patch("/password", protect, passwordRules, validate, ctrl.changePassword);

export default router;
