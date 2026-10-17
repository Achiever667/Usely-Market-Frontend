"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/features/auth/services/auth.service";

export function useForgotPassword() {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess() {
      toast.success("Verification code sent to your email.");
    },
    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to send reset code.",
      );
    },
  });
}
