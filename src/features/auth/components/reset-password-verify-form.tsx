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
import UiPinInput from "@/components/ui/pin-input";
import {
  verifyResetPasswordSchema,
  type VerifyResetPasswordFormValues,
} from "@/features/auth/schemas/auth.schema";

interface ResetPasswordVerifyFormProps {
  email: string;
}

export function ResetPasswordVerifyForm({ email }: ResetPasswordVerifyFormProps) {
  const router = useRouter();

  const form = useForm<VerifyResetPasswordFormValues>({
    resolver: zodResolver(verifyResetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: VerifyResetPasswordFormValues) {
    router.push(
      `/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(values.code)}`,
    );
  }

  return (
    <div className="w-full mx-auto flex justify-center">
 <UiForm {...form}>
      <form className="space-y-2 " onSubmit={form.handleSubmit(onSubmit)}>
        <UiFormField
          control={form.control}
          name="code"
          render={({ field, fieldState }) => (
            <UiFormItem>
              <UiFormLabel>Verification code</UiFormLabel>
              <UiFormControl>
                <UiPinInput
                  length={6}
                  value={field.value}
                  onChange={field.onChange}
                  inputClassName={fieldState.invalid ? "border-danger-500" : ""}
                />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          )}
        />

        <UiButton
          type="submit"
          className="mt-4"
          fullWidth
          disabled={!form.formState.isValid}
          isLoading={false}
        >
          Verify
        </UiButton>
      </form>
    </UiForm>
    </div>
   
  );
}
