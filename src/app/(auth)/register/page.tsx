"use client";

import { Suspense, useEffect, useState } from "react";

import {
  UiCard,
  UiCardContent,
  UiCardDescription,
  UiCardHeader,
  UiCardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/features/auth/components/register-form";
import { Guard } from "@/guards/Guard";

export default function RegisterPage() {
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
        className="mx-auto w-full max-w-md lg:shadow-lg"
      >
        <UiCardHeader className="hidden lg:flex">
          <UiCardTitle>Create account</UiCardTitle>
          <UiCardDescription>
            Start using your customer, vendor, or admin workspace.
          </UiCardDescription>
        </UiCardHeader>

        <UiCardContent>
          <Suspense>
            <RegisterForm />
          </Suspense>
        </UiCardContent>
      </UiCard>
    </Guard>
  );
}
