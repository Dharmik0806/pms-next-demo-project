import type { Metadata } from "next";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a free PMS account and start tracking projects with your team.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
