import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { formatCurrency } from "@/lib/formatCurrency";
import CategorySplitChart from "./CategorySplitChart";

const spendingByCategory = [
  {
    id: 1,
    name: "Food",
    value: 1_000_000,
    fill: "var(--chart-1)",
  },
  {
    id: 2,
    name: "Transportation",
    value: 2_000_000,
    fill: "var(--chart-2)",
  },
  {
    id: 3,
    name: "Entertainment",
    value: 3_000_000,
    fill: "var(--chart-3)",
  },
  {
    id: 4,
    name: "Health & Wellness",
    value: 1_000_000,
    fill: "var(--chart-4)",
  },
  {
    id: 5,
    name: "Other",
    value: 4_000_000,
    fill: "var(--chart-5)",
  },
];

export default function CategorySplit() {
  return (
    <Card className="gap-2 p-2 h-max">
      <CardHeader className="p-0">
        <CardTitle className="text-lg">Category split</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-2 p-2">
        {/* CHART */}
        <div className="col-span-2 md:col-span-1 min-h-[200px] h-max">
          <CategorySplitChart spendingByCategory={spendingByCategory} />
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col gap-2 overflow-auto">
          {spendingByCategory.map(({ id, name, value }) => (
            <Item key={id} className="w-full bg-brand-50/50 p-2 gap-0">
              <ItemContent>
                <ItemTitle className="text-brand-900 line-clamp-1">
                  {name}
                </ItemTitle>
              </ItemContent>
              <ItemContent className="flex-none text-center">
                <ItemDescription>
                  {formatCurrency({ value, currency: "IDR", decimal: 0 })}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
