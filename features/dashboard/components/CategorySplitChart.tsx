"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

type SpendingByCategory = {
  id: number;
  name: string;
  value: number;
  fill: string;
};

const chartConfig = {
  food: {
    label: "Food",
    color: "var(--chart-1)",
  },
  transportation: {
    label: "Transportation",
    color: "var(--chart-2)",
  },
  entertainment: {
    label: "Entertainment",
    color: "var(--chart-3)",
  },
  healthWellness: {
    label: "Health & Wellness",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function CategorySplitChart({
  spendingByCategory,
}: Readonly<{
  spendingByCategory: SpendingByCategory[];
}>) {
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
          dataKey="value"
          nameKey="name"
          innerRadius={60}
        />
      </PieChart>
    </ChartContainer>
  );
}
