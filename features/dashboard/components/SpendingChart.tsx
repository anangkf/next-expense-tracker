"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const latestSpending = [
  { id: "1", date: "2024-05-20", totalSpent: 150_000 },
  { id: "2", date: "2024-05-21", totalSpent: 250_000 },
  { id: "3", date: "2024-05-22", totalSpent: 175_000 },
  { id: "4", date: "2024-05-23", totalSpent: 300_000 },
  { id: "5", date: "2024-05-24", totalSpent: 120_000 },
  { id: "6", date: "2024-05-25", totalSpent: 450_000 },
  { id: "7", date: "2024-05-26", totalSpent: 200_000 },
  { id: "8", date: "2024-05-27", totalSpent: 180_000 },
  { id: "9", date: "2024-05-28", totalSpent: 220_000 },
  { id: "10", date: "2024-05-29", totalSpent: 310_000 },
  { id: "11", date: "2024-05-30", totalSpent: 90_000 },
  { id: "12", date: "2024-05-31", totalSpent: 500_000 },
  { id: "13", date: "2024-06-01", totalSpent: 75_000 },
  { id: "14", date: "2024-06-02", totalSpent: 160_000 },
  { id: "15", date: "2024-06-03", totalSpent: 280_000 },
  { id: "16", date: "2024-06-04", totalSpent: 190_000 },
  { id: "17", date: "2024-06-05", totalSpent: 320_000 },
  { id: "18", date: "2024-06-06", totalSpent: 130_000 },
  { id: "19", date: "2024-06-07", totalSpent: 400_000 },
  { id: "20", date: "2024-06-08", totalSpent: 210_000 },
  { id: "21", date: "2024-06-09", totalSpent: 140_000 },
  { id: "22", date: "2024-06-10", totalSpent: 270_000 },
  { id: "23", date: "2024-06-11", totalSpent: 180_000 },
  { id: "24", date: "2024-06-12", totalSpent: 350_000 },
  { id: "25", date: "2024-06-13", totalSpent: 110_000 },
  { id: "26", date: "2024-06-14", totalSpent: 480_000 },
  { id: "27", date: "2024-06-15", totalSpent: 230_000 },
  { id: "28", date: "2024-06-16", totalSpent: 170_000 },
  { id: "29", date: "2024-06-17", totalSpent: 290_000 },
  { id: "30", date: "2024-06-18", totalSpent: 160_000 },
];

const chartConfig = {
  totalSpent: {
    label: "Total spent",
    color: "var(--color-brand-500)",
  },
} satisfies ChartConfig;

export default function SpendingChart() {
  return (
    <>
      {/* <div className="text-md">Spending chart</div> */}
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-full w-full"
      >
        <LineChart
          accessibilityLayer
          data={latestSpending}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey="totalSpent"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }}
              />
            }
          />
          <Line
            dataKey={"totalSpent"}
            type="monotone"
            stroke={chartConfig.totalSpent.color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
}
