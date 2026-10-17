import * as React from "react";

import { cn } from "@/lib/utils";

function UiTable({ className, ...props }: React.ComponentProps<"table">) {
  return <div className="relative w-full overflow-auto"><table className={cn("w-full caption-bottom text-sm", className)} {...props} /></div>;
}

function UiTableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}

function UiTableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function UiTableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot className={cn("border-t bg-muted/50 font-medium", className)} {...props} />;
}

function UiTableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} {...props} />;
}

function UiTableHead({ className, ...props }: React.ComponentProps<"th">) {
  return <th className={cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground", className)} {...props} />;
}

function UiTableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn("p-2 align-middle", className)} {...props} />;
}

function UiTableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return <caption className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />;
}

export { UiTable, UiTableBody, UiTableCaption, UiTableCell, UiTableFooter, UiTableHead, UiTableHeader, UiTableRow };
