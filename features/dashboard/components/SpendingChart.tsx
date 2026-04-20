"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { DashboardOverview } from "../services/useDashboard";

const chartConfig = {
  totalAmount: {
    label: "Total amount",
    color: "var(--color-brand-500)",
  },
} satisfies ChartConfig;

type SpendingChartProps = {
  data: DashboardOverview["daily_expenses"];
};

export default function SpendingChart({ data }: SpendingChartProps) {
  return (
    <>
      {/* <div className="text-md">Spending chart</div> */}
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-full w-full"
        id="spending"
      >
        <LineChart
          accessibilityLayer
          data={data}
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
            dataKey={"total_amount"}
            type="monotone"
            stroke={chartConfig.totalAmount.color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
}
