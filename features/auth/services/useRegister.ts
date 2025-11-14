import api from "@/lib/client/api";
import { SuccessResponse } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { RegisterPayload, RegisterResponse } from "../types/register";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterPayload) => {
      try {
        const response = await api.post<SuccessResponse<RegisterResponse>>(
          "/auth/register",
          data
        );

        return response.data.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};
