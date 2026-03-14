"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatCurrency";
import SpendingChart from "./SpendingChart";
import { useGetActiveBudgetPlan } from "@/features/budget-plan/services/useBudgetPlan";
import {
  DashboardOverview,
  useGetDashboardOverview,
} from "../services/useDashboard";

const overviewLabels = {
  total_spent: "Total Spent",
  this_week_spent: "This Week Spent",
  left_in_budget: "Left in Budget",
};

export default function SpendingOverview() {
  const { data } = useGetActiveBudgetPlan();
  const { data: dashboardOverview } = useGetDashboardOverview();

  console.log({ data, dashboardOverview });
  return (
    <Card className="gap-2 p-2 h-fit">
      <CardHeader className="p-0">
        <CardTitle className="text-lg">Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-3 gap-2 p-2 overflow-auto">
        {Object.keys(dashboardOverview?.overview || {}).map((key) => {
          const label = overviewLabels[key as keyof typeof overviewLabels];
          return (
            <Card
              key={key}
              className="w-full col-span-3 md:col-span-1 bg-brand-50/50 p-2 gap-0"
            >
              <CardHeader className="p-0">
                <CardTitle className="text-xs text-muted-foreground">
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-sm text-brand-900 font-semibold">
                  {formatCurrency({
                    value:
                      dashboardOverview?.overview[
                        key as keyof DashboardOverview["overview"]
                      ] || 0,
                    currency: "IDR",
                    decimal: 0,
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* CHART */}
        <div className="col-span-3 h-[200px]">
          <SpendingChart data={dashboardOverview?.daily_expenses || []} />
        </div>
      </CardContent>
    </Card>
  );
}
