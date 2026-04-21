import { BudgetBucketType } from "@/features/budget-bucket/types";
import { Category } from "@/features/categories/types";
import { buildQueryParams, QueryParams } from "@/lib/buildQueryParams";
import api from "@/lib/client/api";
import { ResponseWithPagination, SuccessResponse } from "@/types/common";
import { PREFIX } from "@/types/prefix";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type Expense = {
  id: number;
  name: string;
  amount: number;
  category: Category;
  bucket_type: BudgetBucketType;
  created_at: string;
  updated_at: string;
};

type ExpenseRequest = Pick<Expense, "amount" | "name"> & { category_id: string }

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

export const useCreateExpense = (expense: ExpenseRequest) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [PREFIX.POST, PREFIX.EXPENSES, expense],
    mutationFn: async () => {
      try {
        const response = await api.post<SuccessResponse<Expense>>("/expenses", expense)
        return response.data.data
      } catch (error: any) {
        throw error?.response?.data
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PREFIX.EXPENSES, PREFIX.DASHBOARD_OVERVIEW, PREFIX.CATEGORIES] })
      queryClient.refetchQueries({ queryKey: [PREFIX.EXPENSES, PREFIX.DASHBOARD_OVERVIEW, PREFIX.CATEGORIES], exact: false })
    }
  })
}