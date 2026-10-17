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
import { useForgotPassword } from "@/features/auth/hooks/use-forgot-password";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/features/auth/schemas/auth.schema";

export function ForgotPasswordForm() {
  const router = useRouter();
  const forgotPassword = useForgotPassword();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    await forgotPassword.mutateAsync(values);
    router.push(`/reset-password/verify?email=${encodeURIComponent(values.email)}`);
  }

  return (
    <UiForm {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <UiFormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <UiFormItem>
              <UiFormLabel>Email</UiFormLabel>
              <UiFormControl>
                <UiInput
                  {...field}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={fieldState.invalid ? "border-danger-500" : ""}
                />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          )}
        />

        <UiButton
          type="submit"
          fullWidth
          disabled={forgotPassword.isPending || !form.formState.isValid}
          isLoading={forgotPassword.isPending}
        >
          Send verification code
        </UiButton>
      </form>
    </UiForm>
  );
}
