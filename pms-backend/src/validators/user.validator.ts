import { body } from "express-validator";
import { USER_ROLES } from "../models/User";

export const roleRules = [body("role").isIn([...USER_ROLES]).withMessage("Invalid role")];
