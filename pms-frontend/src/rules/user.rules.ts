import { passwordRule, required } from "./common.rules";

export const profileRules = {
  name: { ...required("Name"), maxLength: { value: 80, message: "Name is too long" } },
};

export const changePasswordRules = {
  currentPassword: required("Current password"),
  newPassword: passwordRule,
};
