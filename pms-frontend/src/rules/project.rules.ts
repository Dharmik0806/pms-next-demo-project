import { required } from "./common.rules";

export const projectRules = {
  name: { ...required("Project name"), maxLength: { value: 120, message: "Name is too long" } },
  description: { maxLength: { value: 2000, message: "Description is too long" } },
  progress: {
    min: { value: 0, message: "Minimum is 0" },
    max: { value: 100, message: "Maximum is 100" },
  },
};
