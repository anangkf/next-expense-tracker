import api from "@/lib/client/api";
import { ResponseWithPagination, SuccessResponse } from "@/types/common";
import { PREFIX } from "@/types/prefix";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Category, CategoryRequest } from "../types";

export const useGetDefaultCategories = () => {
  return useQuery({
    queryKey: [PREFIX.GET, PREFIX.DEFAULT_CATEGORIES],
    queryFn: async () => {
      try {
        const response = await api.get<SuccessResponse<Category[]>>(
          "/categories/default",
        );
        return response.data.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};

export const useCreateMultipleCategories = (categories: CategoryRequest[]) => {
  return useMutation({
    mutationKey: [PREFIX.POST, PREFIX.CATEGORIES, PREFIX.MULTIPLE],
    mutationFn: async () => {
      try {
        const response = await api.post<SuccessResponse<Category[]>>(
          "/categories/multiple",
          categories,
        );
        return response.data.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: [PREFIX.GET, PREFIX.CATEGORIES],
    queryFn: async () => {
      try {
        const response =
          await api.get<SuccessResponse<ResponseWithPagination<Category[]>>>(
            "/categories",
          );
        return response.data.data.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};
