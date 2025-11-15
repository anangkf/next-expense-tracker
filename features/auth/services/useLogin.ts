import api from "@/lib/client/api";
import { SuccessResponse } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { LoginPayload, LoginResponse } from "../types/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      try {
        const response = await api.post<SuccessResponse<LoginResponse>>(
          "/auth/login",
          data
        );

        return response.data.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};
