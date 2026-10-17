import * as React from "react";
import { cn } from "@/lib/utils";
import { UiIcon } from "@/components/ui/icon";

export interface UiInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  labelPosition?: "block" | "inline";
  error?: string | boolean;
  inputSize?: "sm" | "md" | "lg";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  showPasswordMeter?: boolean;
  wrapperClassName?: string;
}

const UiInput = React.forwardRef<HTMLInputElement, UiInputProps>(
  (
    {
      className,
      wrapperClassName,
      type,
      label,
      labelPosition = "block",
      error,
      inputSize = "md",
      startIcon,
      endIcon,
      showPasswordMeter = false,
      value,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordRules, setShowPasswordRules] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(value || "");

    const isPasswordType = type === "password";

    const actualType =
      isPasswordType && showPassword ? "text" : type;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (isPasswordType && showPasswordMeter) {
        setShowPasswordRules(true);
      }

      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
    };

    const currentValue =
      (value !== undefined ? value : internalValue) as string;

    const sizeClasses = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    };

    const hasStartIcon = !!startIcon;
    const hasEndIcon = !!endIcon || isPasswordType;

    const passwordRules = [
      {
        label: "At least 8 characters",
        valid: currentValue.length >= 8,
      },
      {
        label: "Contains a number",
        valid: /\d/.test(currentValue),
      },
      {
        label: "Contains uppercase letter",
        valid: /[A-Z]/.test(currentValue),
      },
      {
        label: "Contains special character",
        valid: /[!@#$%^&*(),.?":{}|<>]/.test(currentValue),
      },
    ];

    const strengthScore =
      passwordRules.filter((r) => r.valid).length;

    return (
      <div
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
              labelPosition === "inline"
                ? "min-w-[110px]"
                : "",
              error && "text-danger-500"
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "relative w-full",
            labelPosition === "inline"
              ? "flex-1"
              : "w-full"
          )}
        >
          {hasStartIcon && (
            <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            type={actualType}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            data-slot="input"
            className={cn(
              "w-full rounded-md border bg-background text-foreground transition-colors",
              "placeholder:text-muted-foreground",
              "disabled:cursor-not-allowed disabled:opacity-50",
              sizeClasses[inputSize],
              hasStartIcon && "pl-10",
              hasEndIcon && "pr-10",

              error
                ? "border-danger-500 hover:border-danger-500 focus:border-danger-500 focus-visible:border-danger-500"
                : "border-neutral-200 hover:border-success-400 focus:border-success-600 focus-visible:border-success-600",

              "focus-visible:outline-none",

              className
            )}
            {...props}
          />

          {isPasswordType ? (
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <UiIcon
                name={showPassword ? "eye" : "eye-off"}
                size={18}
              />
            </button>
          ) : endIcon ? (
            <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
              {endIcon}
            </div>
          ) : null}
        </div>

        <p
          className={cn(
            "absolute -bottom-5 left-0 text-xs font-medium text-danger-500 transition-opacity duration-200",
            error ? "opacity-100" : "opacity-0"
          )}
        >
          {typeof error === "string" ? error : ""}
        </p>

        {isPasswordType &&
          showPasswordMeter &&
          showPasswordRules && (
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex h-1.5 w-full gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-full rounded-full transition-colors",
                      strengthScore >= i
                        ? strengthScore <= 2
                          ? "bg-warning-500"
                          : strengthScore === 3
                          ? "bg-success-400"
                          : "bg-success-600"
                        : "bg-neutral-200"
                    )}
                  />
                ))}
              </div>

              <ul className="space-y-1 text-xs">
                {passwordRules.map((rule, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2"
                  >
                    {rule.valid ? (
                      <UiIcon
                        name="check"
                        size={14}
                        className="text-success-600"
                      />
                    ) : (
                      <UiIcon
                        name="x"
                        size={14}
                        className="text-neutral-400"
                      />
                    )}

                    <span
                      className={cn(
                        rule.valid
                          ? "font-medium text-success-600"
                          : "text-muted-foreground"
                      )}
                    >
                      {rule.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }
);

UiInput.displayName = "UiInput";

export { UiInput };