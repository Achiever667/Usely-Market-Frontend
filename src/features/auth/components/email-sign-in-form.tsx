"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
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
import { UiIcon } from "@/components/ui/icon";
import { UiInput } from "@/components/ui/input";
import { useCheckEmail } from "@/features/auth/hooks/use-check-email";
import {
  emailSignInSchema,
  type EmailSignInFormValues,
} from "@/features/auth/schemas/auth.schema";
import { env } from "@/lib/env";

function getGoogleAuthUrl() {
  const graphqlUrl = new URL(env.NEXT_PUBLIC_GRAPHQL_ENDPOINT);
  return `${graphqlUrl.origin}/auth/google`;
}

export function EmailSignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkEmail = useCheckEmail();

  const form = useForm<EmailSignInFormValues>({
    resolver: zodResolver(emailSignInSchema),
    mode: "onChange",
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  async function onSubmit(values: EmailSignInFormValues) {
    const result = await checkEmail.mutateAsync({ email: values.email });
    const params = new URLSearchParams({
      email: values.email,
    });
    const next = searchParams.get("next");

    if (next) {
      params.set("next", next);
    }

    if (result.exists) {
      params.set("step", "password");
      router.push(`/login?${params.toString()}`);
      return;
    }

    if (!result.registrationType || result.registrationType === "email") {
      router.push(`/register?${params.toString()}`);
      return;
    }

    form.setError("email", {
      message: `This email is registered with ${result.registrationType}.`,
    });
  }

  return (
    <div className="space-y-2">

      <UiForm {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <UiFormField
            control={form.control}
            name="email"
            required
            render={({ field, fieldState }) => (
              <UiFormItem>
                <UiFormLabel>Email</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    {...field}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    startIcon={<UiIcon name="mail" size={18} />}
                    className={fieldState.invalid ? "border-danger-500" : ""}
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            )}
          />

          <UiButton
            type="submit"
            className="w-full"
            disabled={checkEmail.isPending || !form.formState.isValid}
            isLoading={checkEmail.isPending}
          >
            Continue with email
          </UiButton>
        </form>
      </UiForm>

       <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground">
          or
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <UiButton
        type="button"
        variant="outline"
        className="w-full"
        isLoading={getGoogleAuthUrl() === undefined}
        icon={<UiIcon name="google" />}
        onClick={() => {
          window.location.href = getGoogleAuthUrl();
        }}
      >
        Sign in with Google
      </UiButton>

     

      
    </div>
  );
}
