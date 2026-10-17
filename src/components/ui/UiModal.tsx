"use client";

import * as React from "react";
import {
  UiDialog,
  UiDialogTrigger,
  UiDialogContent,
  UiDialogHeader,
  UiDialogTitle,
  UiDialogDescription,
  UiDialogFooter,
  UiDialogClose,
} from "@/components/ui/dialog";
import { UiButton } from "@/components/ui/button";
import { UiIcon } from "@/components/ui/icon";
import { cn } from "@/lib/utils"; // Assumes standard Tailwind clsx/tailwind-merge helper

export type UiModalProps = {
  /** Trigger element that opens the modal */
  trigger?: React.ReactNode;
  /** Modal header title */
  title?: React.ReactNode;
  /** Optional subtitle or description below the title */
  description?: React.ReactNode;
  /** Modal body content */
  children?: React.ReactNode;
  /** Custom action buttons/elements for the bottom bar */
  footer?: React.ReactNode;
  /** Custom classes for the trigger container */
  triggerClassName?: string;
  /** Custom classes for the modal content dialog container */
  className?: string;
  /** Controlled open state */
  open?: boolean;
  /** Controlled open state callback */
  onOpenChange?: (open: boolean) => void;
  /** Hide the top-right close button */
  hideCloseButton?: boolean;
  /** Size variants for the modal max-width */
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

const sizeClasses = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
  full: "sm:max-w-[calc(100vw-2rem)] sm:h-[calc(100vh-2rem)]",
};

export function UiModal({
  trigger,
  title,
  description,
  children,
  footer,
  triggerClassName,
  className,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  hideCloseButton = false,
  size = "md",
}: UiModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  // Support both controlled and uncontrolled states
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    setControlledOpen?.(newOpen);
  };

  return (
    <UiDialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger ? (
        <UiDialogTrigger asChild className={triggerClassName}>
          {trigger}
        </UiDialogTrigger>
      ) : (
        <UiDialogTrigger asChild className={triggerClassName}>
          <UiButton variant="default">Open</UiButton>
        </UiDialogTrigger>
      )}

      <UiDialogContent
        className={cn(
          "relative border border-border/40 bg-background/95 backdrop-blur-md shadow-2xl transition-all duration-200 p-6 sm:rounded-2xl overflow-hidden",
          sizeClasses[size],
          className
        )}
      >
        {/* Top Right Close Button */}
        {!hideCloseButton && (
          <UiDialogClose
            className="absolute right-4 top-4 rounded-full p-1.5 opacity-70 transition-opacity hover:opacity-100 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close modal"
          >
            <UiIcon name="x" className="h-4 w-4" />
          </UiDialogClose>
        )}

        {/* Header Section */}
        {(title || description) && (
          <UiDialogHeader className="space-y-1.5 text-left pr-6">
            {title && (
              <UiDialogTitle className="text-xl font-semibold tracking-tight text-foreground">
                {title}
              </UiDialogTitle>
            )}
            {description && (
              <UiDialogDescription className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </UiDialogDescription>
            )}
          </UiDialogHeader>
        )}

        {/* Body Section */}
        <div className="py-2 text-sm text-foreground/90 leading-relaxed overflow-y-auto max-h-[65vh]">
          {children}
        </div>

        {/* Footer Section */}
        {footer ? (
          <UiDialogFooter className="mt-4 pt-4 border-t border-border/40 gap-2 sm:gap-0">
            {footer}
          </UiDialogFooter>
        ) : (
          <UiDialogFooter className="mt-4 pt-4 border-t border-border/40 flex justify-end gap-2">
            <UiDialogClose asChild>
              <UiButton variant="outline" size="sm" className="rounded-lg">
                Close
              </UiButton>
            </UiDialogClose>
          </UiDialogFooter>
        )}
      </UiDialogContent>
    </UiDialog>
  );
}