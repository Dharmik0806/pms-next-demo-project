"use client";
// Profile page: edit your name/avatar and change your password.
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AppButton, AppInput, PageHeader, RoleBadge, UserAvatar } from "@/components/common";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { normalizeError } from "@/helpers/normalize-error";
import { useAuth } from "@/hooks/auth";
import { changePasswordRules, profileRules } from "@/rules/user.rules";
import { authService } from "@/services/auth";

interface ProfileValues { name: string; email: string; avatar: string }
interface PasswordValues { currentPassword: string; newPassword: string; confirmPassword: string }

// ---------- Section 1: personal details ----------
function ProfileForm() {
  const { user, setUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileValues>({
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "", avatar: user?.avatar ?? "" },
  });

  const save = useMutation({
    mutationFn: (v: ProfileValues) => authService.updateProfile({ name: v.name, avatar: v.avatar }),
    onSuccess: (updated) => { setUser(updated); toast.success("Profile updated"); },
    onError: (err) => toast.error(normalizeError(err)),
  });

  return (
    <Card>
      <CardHeader><CardTitle>Personal details</CardTitle><CardDescription>This is how teammates see you.</CardDescription></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit((v) => save.mutate(v))} noValidate className="grid max-w-md gap-4">
          <AppInput label="Full name" error={errors.name?.message} {...register("name", profileRules.name)} />
          <AppInput label="Email" type="email" disabled hint="Email can’t be changed." {...register("email")} />
          <AppInput
            label="Avatar URL"
            placeholder="https://…"
            hint="Optional. Link to a square image."
            error={errors.avatar?.message}
            {...register("avatar", { pattern: { value: /^(https?:\/\/.+)?$/, message: "Enter a link starting with http:// or https://" } })}
          />
          <div><AppButton type="submit" loading={save.isPending}>Save changes</AppButton></div>
        </form>
      </CardContent>
    </Card>
  );
}

// ---------- Section 2: password ----------
function PasswordForm() {
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<PasswordValues>({
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const change = useMutation({
    mutationFn: (v: PasswordValues) => authService.changePassword({ currentPassword: v.currentPassword, newPassword: v.newPassword }),
    onSuccess: () => { toast.success("Password changed"); reset(); },
    onError: (err) => toast.error(normalizeError(err)),
  });

  return (
    <Card>
      <CardHeader><CardTitle>Password</CardTitle><CardDescription>Use at least 6 characters.</CardDescription></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit((v) => change.mutate(v))} noValidate className="grid max-w-md gap-4">
          <AppInput label="Current password" type="password" autoComplete="current-password" error={errors.currentPassword?.message} {...register("currentPassword", changePasswordRules.currentPassword)} />
          <AppInput label="New password" type="password" autoComplete="new-password" error={errors.newPassword?.message} {...register("newPassword", changePasswordRules.newPassword)} />
          <AppInput
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", { validate: (v) => v === getValues("newPassword") || "Passwords don’t match" })}
          />
          <div><AppButton type="submit" loading={change.isPending}>Change password</AppButton></div>
        </form>
      </CardContent>
    </Card>
  );
}

export function ProfileView() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <>
      <PageHeader title="Profile" description="Manage your account." />

      <div className="flex items-center gap-4">
        <UserAvatar name={user.name} src={user.avatar} className="size-16 text-lg" />
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">{user.email} <RoleBadge role={user.role} /></div>
        </div>
      </div>

      {/* key remounts the form with fresh defaults if the user object changes */}
      <ProfileForm key={user.updatedAt} />
      <PasswordForm />
    </>
  );
}
