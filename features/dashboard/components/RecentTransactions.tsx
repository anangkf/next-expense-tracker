import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/ui/data-table";
import recentTransactionsColumns, {
  Transaction,
} from "./RecentTransactionsColumns";

const transactions: Transaction[] = [
  {
    id: 1,
    name: "Gaji Bulanan",
    amount: 7_500_000,
    category: {
      id: 101,
      name: "Gaji",
      type: "income",
      is_default: true,
      created_at: "2023-10-01T10:00:00Z",
      updated_at: "2023-10-01T10:00:00Z",
    },
    created_at: "2023-11-01T09:00:00Z",
    updated_at: "2023-11-01T09:00:00Z",
    deleted_at: "0001-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Makan siang di kantor",
    amount: 35_000,
    category: {
      id: 1,
      name: "Food",
      type: "expense",
      is_default: true,
      created_at: "2023-10-01T10:01:00Z",
      updated_at: "2023-10-01T10:01:00Z",
    },
    created_at: "2023-11-01T12:30:00Z",
    updated_at: "2023-11-01T12:30:00Z",
    deleted_at: "0001-01-01T00:00:00Z",
  },
  {
    id: 3,
    name: "Tiket Nonton Bioskop",
    amount: 50_000,
    category: {
      id: 3,
      name: "Entertainment",
      type: "expense",
      is_default: true,
      created_at: "2023-10-01T10:02:00Z",
      updated_at: "2023-10-01T10:02:00Z",
    },
    created_at: "2023-11-02T19:15:00Z",
    updated_at: "2023-11-02T19:15:00Z",
    deleted_at: "0001-01-01T00:00:00Z",
  },
  {
    id: 4,
    name: "Isi Bensin Motor",
    amount: 50_000,
    category: {
      id: 2,
      name: "Transportation",
      type: "expense",
      is_default: true,
      created_at: "2023-10-01T10:03:00Z",
      updated_at: "2023-10-01T10:03:00Z",
    },
    created_at: "2023-11-03T08:00:00Z",
    updated_at: "2023-11-03T08:00:00Z",
    deleted_at: "0001-01-01T00:00:00Z",
  },
  {
    id: 5,
    name: "Beli Vitamin C",
    amount: 75_000,
    category: {
      id: 4,
      name: "Health & Wellness",
      type: "expense",
      is_default: true,
      created_at: "2023-10-01T10:04:00Z",
      updated_at: "2023-10-01T10:04:00Z",
    },
    created_at: "2023-11-03T17:00:00Z",
    updated_at: "2023-11-03T17:00:00Z",
    deleted_at: "0001-01-01T00:00:00Z",
  },
  {
    id: 6,
    name: "Kado Ulang Tahun Teman",
    amount: 150_000,
    category: {
      id: 5,
      name: "Other",
      type: "expense",
      is_default: true,
      created_at: "2023-10-01T10:05:00Z",
      updated_at: "2023-10-01T10:05:00Z",
    },
    created_at: "2023-11-04T11:00:00Z",
    updated_at: "2023-11-04T11:00:00Z",
    deleted_at: "0001-01-01T00:00:00Z",
  },
  {
    id: 7,
    name: "Bayaran Proyek Freelance",
    amount: 2_500_000,
    category: {
      id: 102,
      name: "Freelance",
      type: "income",
      is_default: false,
      created_at: "2023-10-05T14:00:00Z",
      updated_at: "2023-10-05T14:00:00Z",
    },
    created_at: "2023-11-05T15:00:00Z",
    updated_at: "2023-11-05T15:00:00Z",
    deleted_at: "0001-01-01T00:00:00Z",
  },
  {
    id: 8,
    name: "Makan Malam Keluarga",
    amount: 250_000,
    category: {
      id: 1,
      name: "Food",
      type: "expense",
      is_default: true,
      created_at: "2023-10-01T10:01:00Z",
      updated_at: "2023-10-01T10:01:00Z",
    },
    created_at: "2023-11-05T20:30:00Z",
    updated_at: "2023-11-05T20:30:00Z",
    deleted_at: "0001-01-01T00:00:00Z",
  },
  {
    id: 9,
    name: "Naik Ojek Online",
    amount: 15_000,
    category: {
      id: 2,
      name: "Transportation",
      type: "expense",
      is_default: true,
      created_at: "2023-10-01T10:03:00Z",
      updated_at: "2023-10-01T10:03:00Z",
    },
    created_at: "2023-11-06T09:00:00Z",
    updated_at: "2023-11-06T09:00:00Z",
    deleted_at: "0001-01-01T00:00:00Z",
  },
  {
    id: 10,
    name: "Langganan Streaming Musik",
    amount: 55_000,
    category: {
      id: 3,
      name: "Entertainment",
      type: "expense",
      is_default: true,
      created_at: "2023-10-01T10:02:00Z",
      updated_at: "2023-10-01T10:02:00Z",
    },
    created_at: "2023-11-06T11:45:00Z",
    updated_at: "2023-11-06T11:45:00Z",
    deleted_at: "0001-01-01T00:00:00Z",
  },
];

export default function RecentTransactions() {
  return (
    <Card className="gap-2 p-2 h-max">
      <CardHeader className="p-0">
        <CardTitle className="text-lg">Recent transactions</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-2 p-2">
        <div className="col-span-2 flex flex-col gap-2 overflow-auto">
          {/* TABLE */}
          <DataTable columns={recentTransactionsColumns} data={transactions} />
        </div>
      </CardContent>
    </Card>
  );
}
