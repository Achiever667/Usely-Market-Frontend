"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/features/auth/services/auth.service";
import type { ResetPasswordInput } from "@/features/auth/types/auth.types";

export function useResetPassword() {
  return useMutation({
    mutationFn: (input: ResetPasswordInput) => authService.resetPassword(input),
    onSuccess() {
      toast.success("Password reset successfully.");
    },
    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to reset your password.",
      );
    },
  });
}
