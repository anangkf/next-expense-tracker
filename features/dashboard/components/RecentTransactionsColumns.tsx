"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Category } from "@/features/categories/types";
import { Expense } from "@/features/expenses/services/useExpenses";
import { formatCurrency } from "@/lib/formatCurrency";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React from "react";

const highlight = (text: string, highlight: string) => {
  if (!highlight) return text;
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 px-0 rounded">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </span>
  );
};

type DummyCategory = Omit<
  Category,
  "total_expense" | "icon_name" | "bucket_type_id"
>;

export type Transaction = {
  id: number;
  name: string;
  amount: number;
  category: DummyCategory;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row, table }) => {
      const name = row.getValue("name") as string;
      const filterValue = table.options.meta?.filterValue;
      return highlight(name, filterValue || "");
    },
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
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const formatted = formatCurrency({
        value: amount,
        currency: "IDR",
        decimal: 0,
      });
      return <div>{formatted}</div>;
    },
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
