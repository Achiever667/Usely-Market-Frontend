"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/features/auth/services/auth.service";

export function useCheckEmail() {
  return useMutation({
    mutationFn: authService.checkEmail,
    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to check this email.",
      );
    },
  });
}
