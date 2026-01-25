import api from "@/lib/client/api";
import { ResponseWithPagination, SuccessResponse } from "@/types/common";
import { PREFIX } from "@/types/prefix";
import { Template, TemplateRequest } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetDefaultTemplates = () => {
  return useQuery({
    queryKey: [PREFIX.GET, PREFIX.DEFAULT_EXPENSE_TEMPLATES],
    queryFn: async () => {
      try {
        const response = await api.get<SuccessResponse<Template[]>>(
          "/expense-templates/default",
        );
        return response.data.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};

export const useCreateMultipleTemplates = (templates: TemplateRequest[]) => {
  return useMutation({
    mutationKey: [
      PREFIX.POST,
      PREFIX.DEFAULT_EXPENSE_TEMPLATES,
      PREFIX.MULTIPLE,
    ],
    mutationFn: async () => {
      try {
        const response = await api.post<SuccessResponse<Template[]>>(
          "/expense-templates/multiple",
          templates,
        );
        return response.data.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};

export const useGetTemplates = () => {
  return useQuery({
    queryKey: [PREFIX.GET, PREFIX.EXPENSE_TEMPLATES],
    queryFn: async () => {
      try {
        const response =
          await api.get<SuccessResponse<ResponseWithPagination<Template[]>>>(
            "/expense-templates",
          );
        return response.data.data.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};
