import { z } from "zod";

export const emailSignInSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  rememberMe: z.boolean().optional(),
});


export const registerSchema = z
  .object({
    first_name: z.string().min(2, 'Cannot be less than 2'),
    last_name: z.string().min(2, 'Cannot be less than 2'),
    email: z.string().email('Enter a valid email address.'),
    password: z.string().min(8,'Password must be at least 8 characters.' ),
    confirm_password: z.string().min(1, 'Confirm your password.'),
  })
  .refine(
    (data) =>
      data.password === data.confirm_password,
    {
      message: 'Passwords do not match.',
      path: ['confirm_password'],
    }
  );

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export const verifyResetPasswordSchema = z.object({
  code: z.string().length(6, "Enter the 6 digit verification code."),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirm_password: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

export type EmailSignInFormValues = z.infer<typeof emailSignInSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type VerifyResetPasswordFormValues = z.infer<typeof verifyResetPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
