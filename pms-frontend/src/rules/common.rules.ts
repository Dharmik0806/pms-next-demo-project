// Small reusable validation rules for React Hook Form's `register(name, rules)`.
export const required = (label: string) => ({ required: `${label} is required` });

export const emailRule = {
  required: "Email is required",
  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
};

export const passwordRule = {
  required: "Password is required",
  minLength: { value: 6, message: "Password must be at least 6 characters" },
};
