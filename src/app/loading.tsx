import { UiIcon } from "@/components/ui/icon";

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <UiIcon name="loader" className="size-4 animate-spin" />
        Loading Usely Market
      </div>
    </div>
  );
}
