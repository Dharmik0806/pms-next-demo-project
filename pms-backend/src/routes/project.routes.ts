import { Router } from "express";
import * as ctrl from "../controllers/project.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createProjectRules, updateProjectRules } from "../validators/project.validator";

const router = Router();

router.use(protect);

router.get("/", ctrl.list);
router.get("/stats", ctrl.stats); // keep BEFORE "/:id" or "stats" is treated as an id
router.post("/", createProjectRules, validate, ctrl.create);
router.get("/:id", ctrl.getOne);
router.patch("/:id", updateProjectRules, validate, ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;
