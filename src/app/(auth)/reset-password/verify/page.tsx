"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  UiCard,
  UiCardContent,
  UiCardDescription,
  UiCardHeader,
  UiCardTitle,
} from "@/components/ui/card";

import {
  UiAvatar,
  UiAvatarFallback,
  UiAvatarImage,
} from "@/components/ui/avatar";

import { UiIcon } from "@/components/ui/icon";

import { Guard } from "@/guards/Guard";

import { ResetPasswordVerifyForm } from "@/features/auth/components/reset-password-verify-form";

export default function ResetPasswordVerifyPage() {
  const search = useSearchParams();

  const email = search.get("email") || "";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1024);

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Guard check={["guest"]}>
      <UiCard
        unstyled={isMobile}
        className="mx-auto w-full max-w-md border-neutral-200 bg-card lg:shadow-lg"
      >
        <UiCardHeader className="hidden items-center justify-center gap-2 p-6 text-center lg:flex">
          <UiAvatar className="size-16 border border-success-100 bg-success-50 shadow-sm">
            <UiAvatarImage
              src="/images/avatar-placeholder.png"
              alt="Verification Avatar"
            />

            <UiAvatarFallback className="bg-success-100 text-success-600">
              <UiIcon name="shield-check" size={28} />
            </UiAvatarFallback>
          </UiAvatar>

          <div className="space-y-1">
            <UiCardTitle className="font-heading text-h3 font-bold">
              Verify Code
            </UiCardTitle>

            <UiCardDescription className="text-body text-muted-foreground">
              Enter the verification code sent to your email address.
            </UiCardDescription>
          </div>
        </UiCardHeader>

        <div className="flex justify-center lg:hidden">
          <UiAvatar className="size-20 border-4 border-success-100 shadow-md">
            <UiAvatarImage
              src="/images/avatar-placeholder.png"
              alt="Verification Avatar"
            />

            <UiAvatarFallback className="bg-success-100 text-success-600">
              <UiIcon name="shield-check" size={32} />
            </UiAvatarFallback>
          </UiAvatar>
        </div>

        <UiCardContent className="pt-6 lg:pt-0">
          <ResetPasswordVerifyForm email={email} />
        </UiCardContent>
      </UiCard>
    </Guard>
  );
}