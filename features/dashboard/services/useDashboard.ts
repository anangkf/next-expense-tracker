import api from "@/lib/client/api";
import { SuccessResponse } from "@/types/common";
import { PREFIX } from "@/types/prefix";
import { useQuery } from "@tanstack/react-query";

type DailyExpense = {
  date: string;
  total_amount: number;
};

type Overview = {
  total_spent: number;
  this_week_spent: number;
  left_in_budget: number;
};

export type DashboardOverview = {
  daily_expenses: DailyExpense[];
  overview: Overview;
};

export const useGetDashboardOverview = () => {
  return useQuery({
    queryKey: [PREFIX.GET, PREFIX.DASHBOARD_OVERVIEW],
    queryFn: async () => {
      try {
        const response =
          await api.get<SuccessResponse<DashboardOverview>>("/dashboard");
        return response.data.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};
