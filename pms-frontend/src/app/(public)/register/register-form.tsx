"use client";
// Sign-up form. The first account created in a fresh database becomes the admin.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AppButton, AppInput } from "@/components/common";
import { ROUTES } from "@/constants/routes";
import { normalizeError } from "@/helpers/normalize-error";
import { useAuth } from "@/hooks/auth";
import { registerRules } from "@/rules/auth.rules";
import type { RegisterPayload } from "@/services/auth";

export function RegisterForm() {
  const router = useRouter();
  const { register: signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>({ defaultValues: { name: "", email: "", password: "" } });

  const onSubmit = async (values: RegisterPayload) => {
    try {
      await signUp(values);
      toast.success("Account created");
      router.replace(ROUTES.dashboard);
    } catch (err) {
      toast.error(normalizeError(err));
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">It takes less than a minute.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
        <AppInput label="Full name" autoComplete="name" error={errors.name?.message} {...register("name", registerRules.name)} />
        <AppInput label="Email" type="email" autoComplete="email" placeholder="you@company.com" error={errors.email?.message} {...register("email", registerRules.email)} />
        <AppInput label="Password" type="password" autoComplete="new-password" hint="At least 6 characters" error={errors.password?.message} {...register("password", registerRules.password)} />
        <AppButton type="submit" className="w-full" loading={isSubmitting}>Create account</AppButton>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account? <Link href={ROUTES.login} className="font-medium text-primary hover:underline">Log in</Link>
      </p>
    </>
  );
}
