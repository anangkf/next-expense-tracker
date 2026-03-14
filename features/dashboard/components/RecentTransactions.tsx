"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable, { Pagination } from "@/components/ui/data-table";
import recentTransactionsColumns from "./RecentTransactionsColumns";
import { useGetExpenses } from "@/features/expenses/services/useExpenses";
import { useState } from "react";
import { QueryParams } from "@/lib/buildQueryParams";
import { PaginationState } from "@tanstack/react-table";

const defaultQueryParams: QueryParams = {
  page: 1,
  limit: 10,
  sortBy: "created_at",
  order: "desc",
};

export default function RecentTransactions() {
  const [queryParams, setQueryParams] =
    useState<QueryParams>(defaultQueryParams);

  const { data, isLoading } = useGetExpenses(queryParams || defaultQueryParams);
  const { data: expenses, ...pagination } = data || {};

  const handlePaginationChange = (state: PaginationState) => {
    setQueryParams((prev) => ({
      ...prev,
      page: state.pageIndex + 1,
      limit: state.pageSize,
    }));
  };

  return (
    <Card className="gap-2 p-2 h-max">
      <CardHeader className="p-0">
        <CardTitle className="text-lg">Recent transactions</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-2 p-2">
        <div className="col-span-2 flex flex-col gap-2 overflow-auto">
          {/* TABLE */}
          <DataTable
            columns={recentTransactionsColumns}
            data={expenses || []}
            pagination={(pagination || {}) as Pagination}
            defaultSorting={[{ id: "created_at", desc: true }]}
            handleFilter={(value: string) => {
              setQueryParams({
                ...queryParams,
                page: 1,
                name: value,
              });
            }}
            handlePaginationChange={handlePaginationChange} //this update query params on pagination change
            loading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
}
