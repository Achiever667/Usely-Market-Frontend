"use client";

import { useSearchParams } from "next/navigation";
import {
  UiCard,
  UiCardContent,
  UiCardHeader,
  UiCardTitle,
} from "@/components/ui/card";
import { Guard } from "@/guards/Guard";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function ResetPasswordPage() {
  const search = useSearchParams();
  const email = search.get("email") || "";
  const code = search.get("code") || "";

  return (
    <Guard check={["guest"]}>
      <UiCard className="mx-auto w-full max-w-md">
        <UiCardHeader>
          <UiCardTitle>Reset password</UiCardTitle>
        </UiCardHeader>

        <UiCardContent>
          <ResetPasswordForm email={email} code={code} />
        </UiCardContent>
      </UiCard>
    </Guard>
  );
}
