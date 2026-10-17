import type * as React from "react";

import { EmptyState } from "@/components/shared/empty-state";
import { UiSkeleton } from "@/components/ui/skeleton";
import {
  UiTable,
  UiTableBody,
  UiTableCell,
  UiTableHead,
  UiTableHeader,
  UiTableRow,
} from "@/components/ui/table";

export type DataTableColumn<TData> = {
  key: string;
  header: string;
  cell: (row: TData) => React.ReactNode;
  className?: string;
};

type DataTableProps<TData> = {
  data: TData[];
  columns: DataTableColumn<TData>[];
  getRowId: (row: TData) => string;
  loading?: boolean;
  emptyTitle?: string;
};

export function DataTable<TData>({
  data,
  columns,
  getRowId,
  loading,
  emptyTitle = "No records found",
}: DataTableProps<TData>) {
  if (loading) {
    return (
      <div className="space-y-2 rounded-lg border p-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <UiSkeleton key={index} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <div className="rounded-lg border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            {columns.map((column) => (
              <UiTableHead key={column.key} className={column.className}>
                {column.header}
              </UiTableHead>
            ))}
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          {data.map((row) => (
            <UiTableRow key={getRowId(row)}>
              {columns.map((column) => (
                <UiTableCell key={column.key} className={column.className}>
                  {column.cell(row)}
                </UiTableCell>
              ))}
            </UiTableRow>
          ))}
        </UiTableBody>
      </UiTable>
    </div>
  );
}
