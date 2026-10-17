"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authService } from "@/features/auth/services/auth.service";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess() {
      queryClient.invalidateQueries();
      toast.success("Welcome back.");
    },
    onError(error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in.");
    },
  });
}
