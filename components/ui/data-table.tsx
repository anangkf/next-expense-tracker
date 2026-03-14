"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  RowData,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Button } from "./button";
import { useState } from "react";
import { Input } from "./input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { DataTablePagination } from "./data-table-pagination";
import { useDebouncedCallback } from "use-debounce";
import { Spinner } from "./spinner";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    filterValue?: string;
  }
}

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: Pagination;
  defaultSorting?: SortingState;
  handleFilter?: (value: string) => void;
  defaultFilter?: string;
  handlePaginationChange?: (state: PaginationState) => void;
  loading?: boolean;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  defaultSorting = [],
  handleFilter = (value: string) => {},
  defaultFilter = "name",
  handlePaginationChange,
  loading = false,
}: DataTableProps<TData, TValue>) {
  const [paginationState, setPaginationState] = useState({
    pageIndex: pagination?.page - 1 || 0,
    pageSize: pagination?.limit || 10,
  });
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [filterInput, setFilterInput] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const onPaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const newPagination =
      typeof updater === "function" ? updater(paginationState) : updater;

    setPaginationState(newPagination);

    handlePaginationChange?.(newPagination);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    meta: {
      filterValue: filterInput,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: paginationState,
    },
    manualPagination: true,
    onPaginationChange,
    pageCount: pagination?.total_pages,
    rowCount: pagination?.total,
    manualFiltering: true,
  });

  const debouncedHandleFilter = useDebouncedCallback((value: string) => {
    if (handleFilter) {
      handleFilter(value);
    }
    table.setPageIndex(0);
  }, 200);

  return (
    <div className="flex flex-col gap-2">
      {/* FILTERS */}
      <div className="flex items-center py-4">
        <Input
          placeholder={`Filter ${defaultFilter}...`}
          value={filterInput}
          onChange={(event) => {
            setFilterInput(event.target.value);
            debouncedHandleFilter(event.target.value);
          }}
          className="max-w-sm"
        />

        {/* COLUMN VISIBILITY */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="w-full">
                <TableCell colSpan={columns.length} className="h-24">
                  <Spinner className="size-6 mx-auto" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <DataTablePagination table={table} />

      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
}
