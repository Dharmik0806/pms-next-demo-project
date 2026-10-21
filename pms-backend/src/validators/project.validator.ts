import { body } from "express-validator";
import { PROJECT_PRIORITIES, PROJECT_STATUSES } from "../models/Project";

export const createProjectRules = [
  body("name").trim().notEmpty().withMessage("Project name is required"),
  body("status").optional().isIn([...PROJECT_STATUSES]).withMessage("Invalid status"),
  body("priority").optional().isIn([...PROJECT_PRIORITIES]).withMessage("Invalid priority"),
  body("progress").optional().isInt({ min: 0, max: 100 }).withMessage("Progress must be 0-100"),
  body("dueDate").optional({ values: "falsy" }).isISO8601().withMessage("Invalid due date"),
  body("startDate").optional({ values: "falsy" }).isISO8601().withMessage("Invalid start date"),
  body("members").optional().isArray().withMessage("Members must be a list"),
];

// For updates every field is optional, so we reuse the same rules but
// make `name` optional.
export const updateProjectRules = [
  body("name").optional().trim().notEmpty().withMessage("Project name cannot be empty"),
  ...createProjectRules.slice(1),
];
