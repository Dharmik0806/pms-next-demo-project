"use client";
// Login form built with React Hook Form + our common components.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AppButton, AppInput } from "@/components/common";
import { ROUTES } from "@/constants/routes";
import { normalizeError } from "@/helpers/normalize-error";
import { useAuth } from "@/hooks/auth";
import { loginRules } from "@/rules/auth.rules";
import type { LoginPayload } from "@/services/auth";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({ defaultValues: { email: "", password: "" } });

  // Runs only when every rule passes
  const onSubmit = async (values: LoginPayload) => {
    try {
      await login(values);
      toast.success("Welcome back");
      router.replace(ROUTES.dashboard);
    } catch (err) {
      toast.error(normalizeError(err));
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
      <p className="mt-1 text-sm text-muted-foreground">Enter your details to open your workspace.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
        <AppInput label="Email" type="email" autoComplete="email" placeholder="you@company.com" error={errors.email?.message} {...register("email", loginRules.email)} />
        <AppInput label="Password" type="password" autoComplete="current-password" error={errors.password?.message} {...register("password", loginRules.password)} />
        <AppButton type="submit" className="w-full" loading={isSubmitting}>Log in</AppButton>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here? <Link href={ROUTES.register} className="font-medium text-primary hover:underline">Create an account</Link>
      </p>
    </>
  );
}
