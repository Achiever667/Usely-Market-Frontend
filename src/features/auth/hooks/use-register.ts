"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authService } from "@/features/auth/services/auth.service";

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess() {
      queryClient.invalidateQueries();
      toast.success("Your account is ready.");
    },
    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to create account.",
      );
    },
  });
}
