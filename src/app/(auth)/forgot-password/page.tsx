"use client";

import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import {
  UiCard,
  UiCardContent,
  UiCardHeader,
  UiCardTitle,
} from "@/components/ui/card";
import { Guard } from "@/guards/Guard";

export default function ForgotPasswordPage() {
  return (
    <Guard check={["guest"]}>
      <UiCard className="mx-auto w-full max-w-md">
        <UiCardHeader>
          <UiCardTitle>Forgot password</UiCardTitle>
        </UiCardHeader>

        <UiCardContent>
          <ForgotPasswordForm />
        </UiCardContent>
      </UiCard>
    </Guard>
  );
}
