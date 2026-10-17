"use client";

import * as React from "react";

import { UiButton } from "@/components/ui/button";
import { UiIcon } from "@/components/ui/icon";
import { UiInput } from "@/components/ui/input";

type SearchInputProps = Omit<React.ComponentProps<typeof UiInput>, "onChange"> & {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange, placeholder = "Search", ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <UiIcon name="search" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <UiInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-10"
        {...props}
      />
      {value ? (
        <UiButton
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 size-10"
          onClick={() => onChange("")}
        >
          <UiIcon name="x" className="size-4" />
          <span className="sr-only">Clear search</span>
        </UiButton>
      ) : null}
    </div>
  );
}
