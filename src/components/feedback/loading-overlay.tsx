import { UiIcon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function LoadingOverlay({ label = "Loading", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm", className)}>
      <div className="flex items-center gap-2 rounded-md border bg-card px-4 py-2 text-sm shadow-sm">
        <UiIcon name="loader" className="size-4 animate-spin" />
        <span>{label}</span>
      </div>
    </div>
  );
}
