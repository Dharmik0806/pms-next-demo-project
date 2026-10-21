import { emailRule, passwordRule, required } from "./common.rules";

export const loginRules = {
  email: emailRule,
  password: required("Password"),
};

export const registerRules = {
  name: { ...required("Name"), maxLength: { value: 80, message: "Name is too long" } },
  email: emailRule,
  password: passwordRule,
};
