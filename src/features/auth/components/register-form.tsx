'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { UiButton } from '@/components/ui/button';
import {
  UiForm,
  UiFormControl,
  UiFormField,
  UiFormItem,
  UiFormLabel,
  UiFormMessage,
} from '@/components/ui/form';
import { UiInput } from '@/components/ui/input';

import { useRegister } from '@/features/auth/hooks/use-register';

import {
  registerSchema,
  type RegisterFormValues,
} from '@/features/auth/schemas/auth.schema';

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const register = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      email: searchParams.get('email') ?? '',
      password: '',
      confirm_password: '',
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    const { confirm_password, ...payload } = values;

    await register.mutateAsync(payload);

    router.replace(searchParams.get('next') ?? '/marketplace');
  }

  return (
    <UiForm {...form}>
      <form
        className="space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* FIRST & LAST NAME */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <UiFormField
            control={form.control}
            name="first_name"
            render={({ field, fieldState }) => (
              <UiFormItem>
                <UiFormLabel>First Name</UiFormLabel>

                <UiFormControl>
                  <UiInput
                    {...field}
                    autoComplete="given-name"
                    placeholder="John"
                    className={
                      fieldState.invalid
                        ? 'border-danger-500'
                        : ''
                    }
                  />
                </UiFormControl>

                <UiFormMessage />
              </UiFormItem>
            )}
          />

          <UiFormField
            control={form.control}
            name="last_name"
            render={({ field, fieldState }) => (
              <UiFormItem>
                <UiFormLabel>Last Name</UiFormLabel>

                <UiFormControl>
                  <UiInput
                    {...field}
                    autoComplete="family-name"
                    placeholder="Doe"
                    className={
                      fieldState.invalid
                        ? 'border-danger-500'
                        : ''
                    }
                  />
                </UiFormControl>

                <UiFormMessage />
              </UiFormItem>
            )}
          />
        </div>

        {/* EMAIL */}
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
                  className={
                    fieldState.invalid
                      ? 'border-danger-500'
                      : ''
                  }
                />
              </UiFormControl>

              <UiFormMessage />
            </UiFormItem>
          )}
        />

        {/* PASSWORD */}
        <UiFormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <UiFormItem>
              <UiFormLabel>Password</UiFormLabel>

              <UiFormControl>
                <UiInput
                  {...field}
                  type="password"
                  autoComplete="new-password"
                  showPasswordMeter
                  placeholder="Create a password"
                  className={
                    fieldState.invalid
                      ? 'border-danger-500'
                      : ''
                  }
                />
              </UiFormControl>

              <UiFormMessage />
            </UiFormItem>
          )}
        />

        {/* CONFIRM PASSWORD */}
        <UiFormField
          control={form.control}
          name="confirm_password"
          render={({ field, fieldState }) => (
            <UiFormItem>
              <UiFormLabel>
                Confirm Password
              </UiFormLabel>

              <UiFormControl>
                <UiInput
                  {...field}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  className={
                    fieldState.invalid
                      ? 'border-danger-500'
                      : ''
                  }
                />
              </UiFormControl>

              <UiFormMessage />
            </UiFormItem>
          )}
        />

        {/* SUBMIT */}
        <UiButton
          type="submit"
          className="w-full mt-4"
          disabled={
            register.isPending ||
            !form.formState.isValid
          }
          isLoading={register.isPending}
        >
          Create account
        </UiButton>

        {/* LOGIN */}
        <div className="flex items-center justify-center gap-1 pt-2 text-sm text-muted-foreground">
          <span>
            Already have an account?
          </span>

          <UiButton
            asChild
            variant="link"
            className="h-auto p-0 text-success-500"
          >
            <Link
              href="/login"
              className="text-success-500"
            >
              Sign in
            </Link>
          </UiButton>
        </div>
      </form>
    </UiForm>
  );
}