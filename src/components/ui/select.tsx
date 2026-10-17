"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { UiIcon } from "@/components/ui/icon";

export type UiSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export interface UiSelectProps {
  options: UiSelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, option: UiSelectOption) => void;
  onSearchChange?: (value: string) => void;
  debounceMs?: number;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  label?: string;
  labelPosition?: "block" | "inline";
  error?: string | boolean;
  disabled?: boolean;
  loading?: boolean;
  searchable?: boolean;
  selectSize?: "sm" | "md" | "lg";
  className?: string;
  wrapperClassName?: string;
  menuClassName?: string;
  name?: string;
}

const sizeClasses = {
  sm: "h-9 px-3 text-xs sm:h-8 sm:px-3 sm:text-xs",
  md: "h-9 px-3 text-sm sm:h-10 sm:px-3 sm:text-sm",
  lg: "h-10 px-3 text-sm sm:h-12 sm:px-4 sm:text-base",
};

const optionSizeClasses = {
  sm: "px-3 py-2 text-xs sm:px-3 sm:py-1.5 sm:text-xs",
  md: "px-3 py-2 text-sm sm:px-3 sm:py-2 sm:text-sm",
  lg: "px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base",
};

const searchInputSizeClasses = {
  sm: "h-8 text-xs",
  md: "h-9 text-sm",
  lg: "h-10 text-base",
};

const UiSelect = React.forwardRef<HTMLButtonElement, UiSelectProps>(
  (
    {
      options,
      value,
      defaultValue = "",
      onValueChange,
      onSearchChange,
      debounceMs = 300,
      placeholder = "Select an option",
      searchPlaceholder = "Search...",
      emptyMessage = "No options found",
      label,
      labelPosition = "block",
      error,
      disabled = false,
      loading = false,
      searchable = false,
      selectSize = "md",
      className,
      wrapperClassName,
      menuClassName,
      name,
    },
    ref
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const hasSearchedRef = React.useRef(false);

    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [search, setSearch] = React.useState("");

    const isControlled = value !== undefined;

    const selectedValue = isControlled ? value : internalValue;

    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );

    const isDisabled = disabled || loading;

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !search.trim()) {
        return options;
      }

      const searchValue = search.toLowerCase().trim();

      return options.filter((option) =>
        option.label.toLowerCase().includes(searchValue)
      );
    }, [options, search, searchable]);

    React.useEffect(() => {
      if (!searchable || !onSearchChange) {
        return;
      }

      if (!hasSearchedRef.current) {
        hasSearchedRef.current = true;
        return;
      }

      const timeoutId = window.setTimeout(() => {
        onSearchChange(search);
      }, debounceMs);

      return () => window.clearTimeout(timeoutId);
    }, [debounceMs, onSearchChange, search, searchable]);

    React.useEffect(() => {
      function handlePointerDown(event: PointerEvent) {
        if (!rootRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      }

      document.addEventListener("pointerdown", handlePointerDown);

      return () =>
        document.removeEventListener("pointerdown", handlePointerDown);
    }, []);

    React.useEffect(() => {
      if (open && searchable) {
        searchRef.current?.focus();
      }
    }, [open, searchable]);

    const handleSelect = (option: UiSelectOption) => {
      if (option.disabled) {
        return;
      }

      if (!isControlled) {
        setInternalValue(option.value);
      }

      onValueChange?.(option.value, option);

      setOpen(false);
      setSearch("");
    };

    const handleTriggerKeyDown = (
      event: React.KeyboardEvent<HTMLButtonElement>
    ) => {
      if (event.key === "Escape") {
        setOpen(false);
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    return (
      <div
        ref={rootRef}
        className={cn(
          "relative w-full font-poppins",
          labelPosition === "inline"
            ? "flex flex-row items-center gap-4"
            : "flex flex-col gap-2",
          wrapperClassName
        )}
      >
        {label && (
          <label
            className={cn(
              "text-body font-medium text-foreground",
              labelPosition === "inline" ? "min-w-[110px]" : "",
              error && "text-danger-500"
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "relative w-full",
            labelPosition === "inline" && "flex-1"
          )}
        >
          {name && (
            <input
              type="hidden"
              name={name}
              value={selectedValue ?? ""}
            />
          )}

          <button
            ref={ref}
            type="button"
            disabled={isDisabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            onKeyDown={handleTriggerKeyDown}
            className={cn(
              "flex w-full items-center justify-between gap-3 rounded-md border bg-background text-left text-foreground transition-colors",
              "border-neutral-200 hover:border-success-400",
              "focus-visible:border-success-600 focus-visible:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error &&
                "border-danger-500 hover:border-danger-500 focus-visible:border-danger-500",
              sizeClasses[selectSize],
              className
            )}
          >
            <span
              className={cn(
                "min-w-0 flex-1 truncate",
                !selectedOption && "text-muted-foreground"
              )}
            >
              {selectedOption?.label ?? placeholder}
            </span>

            {loading ? (
              <UiIcon
                name="loader"
                className="size-4 animate-spin text-muted-foreground"
              />
            ) : (
              <UiIcon
                name="chevron-down"
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform",
                  open && "rotate-180"
                )}
              />
            )}
          </button>

          {open && !isDisabled && (
            <div
              className={cn(
                "absolute z-9999 mt-1 w-full overflow-hidden rounded-md border border-neutral-200 bg-popover text-popover-foreground shadow-md",
                menuClassName
              )}
            >
              {searchable && (
                <div className="border-b border-neutral-200 p-2">
                  <div className="relative">
                    <UiIcon
                      name="search"
                      className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                      ref={searchRef}
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          setOpen(false);
                        }
                      }}
                      placeholder={searchPlaceholder}
                      className={cn(
                        "w-full rounded-md border border-neutral-200 bg-background pl-9 pr-3 font-poppins outline-none transition-colors placeholder:text-muted-foreground focus:border-success-600",
                        searchInputSizeClasses[selectSize]
                      )}
                    />
                  </div>
                </div>
              )}

              <div
                role="listbox"
                className="max-h-60 overflow-y-auto p-1"
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    const selected =
                      option.value === selectedValue;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        disabled={option.disabled}
                        onClick={() => handleSelect(option)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-sm text-left outline-none transition-colors",
                          "hover:bg-accent focus:bg-accent disabled:cursor-not-allowed disabled:opacity-50",
                          optionSizeClasses[selectSize]
                        )}
                      >
                        <span className="min-w-0 flex-1 truncate">
                          {option.label}
                        </span>

                        {selected && (
                          <UiIcon
                            name="check"
                            className="size-4 shrink-0 text-success-600"
                          />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                    {emptyMessage}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <p
          className={cn(
            "h-3 overflow-hidden text-xs font-medium text-danger-500 transition-all duration-200",
            error ? "opacity-100" : "opacity-0"
          )}
        >
          {typeof error === "string" ? error : ""}
        </p>
      </div>
    );
  }
);

UiSelect.displayName = "UiSelect";

export { UiSelect };