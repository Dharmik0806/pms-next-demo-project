// express-validator rules. They run BEFORE the controller.
import { body } from "express-validator";

export const registerRules = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 80 }),
  body("email").trim().isEmail().withMessage("Enter a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

export const loginRules = [
  body("email").trim().isEmail().withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const profileRules = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
];

export const passwordRules = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
];
