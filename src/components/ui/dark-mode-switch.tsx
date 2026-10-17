"use client";

import { motion } from "framer-motion";

import { UiIcon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme.store";

export interface UiDarkModeSwitchProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: {
    container: "h-10 w-[140px]",
    thumb: "top-1 h-8 w-8",
    thumbLight: "left-[calc(100%-36px)]",
    icon: "size-4 shrink-0",
    text: "text-[10px] px-3",
  },
  md: {
    container: "h-16 w-[220px]",
    thumb: "top-1 h-14 w-14",
    thumbLight: "left-[calc(100%-60px)]",
    icon: "size-7 shrink-0",
    text: "text-title px-6",
  },
  lg: {
    container: "h-20 w-[280px]",
    thumb: "top-1 h-[72px] w-[72px]",
    thumbLight: "left-[calc(100%-76px)]",
    icon: "size-9 shrink-0",
    text: "text-base px-8",
  },
};

export function UiDarkModeSwitch({
  size = "md",
  className,
}: UiDarkModeSwitchProps) {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const isDark = theme === "dark";
  const currentSize = sizeStyles[size] || sizeStyles.md;

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle theme"
      className={cn(
        "relative flex hover:cursor-pointer items-center overflow-hidden rounded-full border transition-all duration-300",
        currentSize.container,
        isDark
          ? "border-neutral-800 bg-neutral-900"
          : "border-neutral-200 bg-neutral-100",
        className
      )}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className={cn(
          "absolute rounded-full shadow-md",
          "flex items-center justify-center bg-white",
          currentSize.thumb,
          isDark ? "left-1" : currentSize.thumbLight
        )}
      >
        <UiIcon
          name={isDark ? "moon" : "sun"}
          className={cn(
            currentSize.icon,
            isDark ? "text-neutral-900" : "text-warning-500"
          )}
        />
      </motion.div>

      <div
        className={cn(
          "flex w-full items-center font-poppins font-bold uppercase tracking-wide",
          currentSize.text,
          isDark ? "justify-end text-white" : "justify-start text-neutral-900"
        )}
      >
        {isDark ? "Night Mode" : "Day Mode"}
      </div>
    </button>
  );
}