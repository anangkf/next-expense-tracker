"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";

export type SpendingByCategory = {
  id: number;
  name: string;
  total_expense: number;
  color: string;
};

export default function CategorySplitChart({
  spendingByCategory,
}: Readonly<{
  spendingByCategory: SpendingByCategory[];
}>) {
  const chartConfig = spendingByCategory?.reduce(
    (_, { name, color }) => ({
      [name.toLowerCase()]: {
        label: name,
        color,
      },
    }),
    {} as ChartConfig,
  );

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={spendingByCategory}
          dataKey="total_expense"
          nameKey="name"
          innerRadius={60}
        >
          {spendingByCategory?.map((entry) => (
            <Cell key={entry.id} fill={entry.color} name={entry.name} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
