"use client";

import * as React from "react";

export function usePagination(initialPage = 1, initialPageSize = 20) {
  const [page, setPage] = React.useState(initialPage);
  const [pageSize, setPageSize] = React.useState(initialPageSize);

  return {
    page,
    pageSize,
    offset: (page - 1) * pageSize,
    setPage,
    setPageSize(nextPageSize: number) {
      setPage(1);
      setPageSize(nextPageSize);
    },
  };
}
