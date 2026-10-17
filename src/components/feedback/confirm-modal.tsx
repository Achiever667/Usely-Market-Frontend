"use client";

import {
  UiDialog,
  UiDialogContent,
  UiDialogDescription,
  UiDialogFooter,
  UiDialogHeader,
  UiDialogTitle,
} from "@/components/ui/dialog";
import { UiButton } from "@/components/ui/button";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  destructive?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading,
  destructive,
  onOpenChange,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <UiDialog open={open} onOpenChange={onOpenChange}>
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>{title}</UiDialogTitle>
          {description ? <UiDialogDescription>{description}</UiDialogDescription> : null}
        </UiDialogHeader>
        <UiDialogFooter>
          <UiButton type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </UiButton>
          <UiButton
            type="button"
            variant={destructive ? "destructive" : "default"}
            disabled={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  );
}
