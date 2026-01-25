"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Category } from "@/features/categories/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type Transaction = {
  id: number;
  name: string;
  amount: number;
  category: Category;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "category.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string;
      const formatted = date ? format(date, "dd MMMM yyyy HH:mm:ss") : "";
      return <div>{formatted}</div>;
    },
  },
];

export default columns;
