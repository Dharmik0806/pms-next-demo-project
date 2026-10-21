import type { Metadata } from "next";
import { LoginForm } from "./login-form";

// SEO for this page only
export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to PMS to manage your projects, deadlines and team.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return <LoginForm />;
}
