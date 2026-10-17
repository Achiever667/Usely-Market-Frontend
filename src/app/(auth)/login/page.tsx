'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  UiCard,
  UiCardContent,
  UiCardDescription,
  UiCardHeader,
  UiCardTitle,
} from '@/components/ui/card';

import {
  UiAvatar,
  UiAvatarFallback,
  UiAvatarImage,
} from '@/components/ui/avatar';

import { EmailSignInForm } from '@/features/auth/components/email-sign-in-form';
import { LoginForm } from '@/features/auth/components/login-form';
import { Guard } from '@/guards/Guard';

import { UiIcon } from '@/components/ui/icon';

function LoginCardContent() {
  const searchParams = useSearchParams();

  const isPasswordStep = searchParams.get('step') === 'password';

  return isPasswordStep ? <LoginForm /> : <EmailSignInForm />;
}

export default function LoginPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1024);

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <Guard check={['guest']}>
      <UiCard
        unstyled={isMobile}
        className="mx-auto w-full max-w-md border-neutral-200 bg-card lg:shadow-lg"
      >
        <UiCardHeader className="hidden items-center justify-center gap-2 p-6 text-center lg:flex">
          <UiAvatar className="size-16 hidden border border-success-100 bg-success-50 shadow-sm">
            <UiAvatarImage
              src="/images/logo.png"
              alt="User Avatar"
            />

            <UiAvatarFallback className="bg-success-100 text-success-600">
              <UiIcon name="user" size={28} />
            </UiAvatarFallback>
          </UiAvatar>

          <div className="space-y-1">
            <UiCardTitle className="font-heading text-h1 font-bold font-barlow">
              Sign In
            </UiCardTitle>

            <UiCardDescription className="text-body text-muted-foreground">
              Access your customer, vendor, or admin workspace.
            </UiCardDescription>
          </div>
        </UiCardHeader>

        <div className="flex justify-center lg:hidden">
          <UiAvatar className="size-20 border-4 border-success-100 shadow-md">
            <UiAvatarImage
              src="/images/logo.png"
              alt="User Avatar"
            />

            <UiAvatarFallback className="bg-success-100 text-success-600">
              <UiIcon name="user" size={32} />
            </UiAvatarFallback>
          </UiAvatar>
        </div>

        <UiCardContent className="pt-6 lg:pt-0">
          <Suspense>
            <LoginCardContent />
          </Suspense>
        </UiCardContent>
      </UiCard>
    </Guard>
  );
}

