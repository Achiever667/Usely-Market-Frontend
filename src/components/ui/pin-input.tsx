import * as React from "react";
import { cn } from "@/lib/utils";

export interface UiPinInputProps {
  length?: number;
  value?: string;
  onChange?: (val: string) => void;
  inputClassName?: string;
  wrapperClassName?: string;
  autoFocus?: boolean;
}

const isNumeric = (v: string) => /^[0-9]$/.test(v);

export const UiPinInput: React.FC<UiPinInputProps> = ({
  length = 6,
  value,
  onChange,
  inputClassName,
  wrapperClassName,
  autoFocus = true,
}) => {
  const [internalValue, setInternalValue] = React.useState<string>("");
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const values = React.useMemo(
    () =>
      Array.from({ length }).map((_, i) => currentValue?.[i] ?? ""),
    [currentValue, length]
  );

  const updateValue = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  React.useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
      inputsRef.current[0].select();
    }
  }, [autoFocus]);

  const handleChange = (idx: number, v: string) => {
    if (!v) {
      const next = [...values];
      next[idx] = "";
      updateValue(next.join(""));
      return;
    }

    // allow paste of full code
    if (v.length > 1) {
      const pasted = v.split("").filter((c) => isNumeric(c)).slice(0, length);
      if (pasted.length) {
        updateValue(Array.from({ length }).map((_, i) => pasted[i] ?? "").join(""));
      }
      return;
    }

    const ch = v;
    if (!isNumeric(ch)) return;

    const next = [...values];
    next[idx] = ch;
    updateValue(next.join(""));

    // focus next
    const nextInput = inputsRef.current[idx + 1];
    if (nextInput) nextInput.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    const key = e.key;
    if (key === "Backspace") {
      if (values[idx]) {
        const next = [...values];
        next[idx] = "";
        updateValue(next.join(""));
      } else {
        const prev = inputsRef.current[idx - 1];
        if (prev) {
          prev.focus();
          const next = [...values];
          next[idx - 1] = "";
          updateValue(next.join(""));
        }
      }
    }

    if (key === "ArrowLeft") {
      inputsRef.current[Math.max(0, idx - 1)]?.focus();
    }

    if (key === "ArrowRight") {
      inputsRef.current[Math.min(length - 1, idx + 1)]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").trim();
    if (!text) return;
    const pasted = text.split("").filter((c) => isNumeric(c)).slice(0, length);
    if (pasted.length) {
      updateValue(Array.from({ length }).map((_, i) => pasted[i] ?? "").join(""));
    }
    e.preventDefault();
  };

  return (
    <div className={cn("flex items-center gap-2", wrapperClassName)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={values[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className={cn(
            "w-12 h-12 rounded-lg border bg-background text-center text-lg font-medium",
            "border-neutral-200 focus:border-success-600 focus:outline-none",
            inputClassName
          )}
        />
      ))}
    </div>
  );
};

UiPinInput.displayName = "UiPinInput";

export default UiPinInput;
