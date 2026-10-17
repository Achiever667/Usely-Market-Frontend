"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UiButton } from "@/components/ui/button";
import {
  UiForm,
  UiFormControl,
  UiFormField,
  UiFormItem,
  UiFormLabel,
  UiFormMessage,
} from "@/components/ui/form";
import { UiInput } from "@/components/ui/input";
import { useResetPassword } from "@/features/auth/hooks/use-reset-password";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/schemas/auth.schema";

interface ResetPasswordFormProps {
  email: string;
  code: string;
}

export function ResetPasswordForm({ email, code }: ResetPasswordFormProps) {
  const router = useRouter();
  const resetPassword = useResetPassword();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    await resetPassword.mutateAsync({
      email,
      code,
      password: values.password,
    });
    router.push("/login?reset=1");
  }

  return (
    <UiForm {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <UiFormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <UiFormItem>
              <UiFormLabel>New password</UiFormLabel>
              <UiFormControl>
                <UiInput
                  {...field}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  showPasswordMeter
                  className={fieldState.invalid ? "border-danger-500" : ""}
                />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          )}
        />

        <UiFormField
          control={form.control}
          name="confirm_password"
          render={({ field, fieldState }) => (
            <UiFormItem>
              <UiFormLabel>Confirm password</UiFormLabel>
              <UiFormControl>
                <UiInput
                  {...field}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  className={fieldState.invalid ? "border-danger-500" : ""}
                />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          )}
        />

        <UiButton type="submit" fullWidth disabled={!form.formState.isValid}>
          Reset password
        </UiButton>
      </form>
    </UiForm>
  );
}
