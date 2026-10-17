'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { UiButton } from '@/components/ui/button';
import { UiCheckbox } from '@/components/ui/checkbox';
import {
  UiForm,
  UiFormControl,
  UiFormField,
  UiFormItem,
  UiFormLabel,
  UiFormMessage,
} from '@/components/ui/form';
import { UiInput } from '@/components/ui/input';
import { useLogin } from '@/features/auth/hooks/use-login';
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/auth.schema';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useLogin();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: searchParams.get("email") ?? '',
      password: '',
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    const { email, password } = values;

    await login.mutateAsync({ email, password });
    router.replace(searchParams.get('next') ?? '/marketplace');
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
                  showPasswordMeter={false}
                  placeholder="Enter a strong password"
                  className={fieldState.invalid ? "border-danger-500" : ""}
                />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          )}
        />

        <div className="flex items-center justify-between gap-4 pt-1 text-sm">
          <UiFormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <UiFormItem className="flex flex-row items-center gap-2 space-y-0">
                <UiFormControl>
                  <UiCheckbox
                    checked={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    name={field.name}
                    ref={field.ref}
                  />
                </UiFormControl>
                <UiFormLabel className="text-muted-foreground">
                  Remember me
                </UiFormLabel>
              </UiFormItem>
            )}
          />

          <UiButton asChild variant="link" className="h-auto p-0 text-success-500">
            <Link href="/forgot-password" className="text-success-500">Forgot password?</Link>
          </UiButton>
        </div>

        <UiButton
          type="submit"
          className="w-full"
          disabled={login.isPending || !form.formState.isValid}
          isLoading={login.isPending}
        >
          Sign in
        </UiButton>

        <div className="flex items-center justify-center gap-1 pt-2 text-body font-poppins text-muted-foreground">
          <span>Don&apos;t have an account?</span>
          <UiButton asChild variant="link" className="h-auto p-0 text-success-500">
            <Link href="/register" className="text-success-500">Sign Up</Link>
          </UiButton>
        </div>
      </form>
    </UiForm>
  );
}
