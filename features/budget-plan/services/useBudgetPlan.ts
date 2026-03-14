import api from "@/lib/client/api";
import { SuccessResponse } from "@/types/common";
import { PREFIX } from "@/types/prefix";
import { useQuery } from "@tanstack/react-query";
import { ActiveBudgetPlan } from "../types";

export const useGetActiveBudgetPlan = () => {
  return useQuery({
    queryKey: [PREFIX.GET, PREFIX.ACTIVE_BUDGET_PLAN],
    queryFn: async () => {
      try {
        const response = await api.get<SuccessResponse<ActiveBudgetPlan>>(
          "/budget-plans/active",
        );
        return response.data.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};
