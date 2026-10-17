"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingStore = {
  completedSteps: string[];
  markCompleted: (step: string) => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      completedSteps: [],
      markCompleted: (step) =>
        set((state) => ({
          completedSteps: Array.from(new Set([...state.completedSteps, step])),
        })),
      reset: () => set({ completedSteps: [] }),
    }),
    { name: "usely-onboarding" },
  ),
);
