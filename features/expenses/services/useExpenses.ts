import { BudgetBucketType } from "@/features/budget-bucket/types";
import { Category } from "@/features/categories/types";
import { buildQueryParams, QueryParams } from "@/lib/buildQueryParams";
import api from "@/lib/client/api";
import { ResponseWithPagination, SuccessResponse } from "@/types/common";
import { PREFIX } from "@/types/prefix";
import { useQuery } from "@tanstack/react-query";

export type Expense = {
  id: number;
  name: string;
  amount: number;
  category: Category;
  bucket_type: BudgetBucketType;
  created_at: string;
  updated_at: string;
};

export const useGetExpenses = (params: QueryParams) => {
  const queryParams = buildQueryParams(params);
  return useQuery({
    queryKey: [PREFIX.GET, PREFIX.EXPENSES, queryParams],
    queryFn: async () => {
      try {
        const response = await api.get<
          SuccessResponse<ResponseWithPagination<Expense[]>>
        >(`/expenses?${queryParams}`);
        return response.data.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};
