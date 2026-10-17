"use client";

import { UiButton } from "@/components/ui/button";
import { UiIcon } from "@/components/ui/icon";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <nav className="flex items-center justify-between gap-3" aria-label="Pagination">
      <UiButton
        type="button"
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <UiIcon name="chevron-left" className="size-4" />
        Previous
      </UiButton>
      <span className="text-sm text-muted-foreground">
        Page {page} of {Math.max(totalPages, 1)}
      </span>
      <UiButton
        type="button"
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
        <UiIcon name="chevron-right" className="size-4" />
      </UiButton>
    </nav>
  );
}
