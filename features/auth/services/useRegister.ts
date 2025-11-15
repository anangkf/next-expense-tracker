import api from "@/lib/client/api";
import { SuccessResponse } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { RegisterPayload, RegisterResponse } from "../types/register";
import { setCookie } from "cookies-next";
import constant from "@/lib/constant";
import { setCookieExpires } from "../utils/setCookieExpires";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterPayload) => {
      try {
        const response = await api.post<SuccessResponse<RegisterResponse>>(
          "/auth/register",
          data
        );
        const { token, refresh_token } = response.data.data;
        const tokenExpires = setCookieExpires(constant.EXPIRE_DAYS);
        const refreshTokenExpires = setCookieExpires(
          constant.REFRESH_EXPIRE_DAYS
        );

        setCookie(constant.TOKEN_KEYNAME as string, token, {
          expires: tokenExpires,
        });
        setCookie(constant.REFRESH_TOKEN_KEYNAME as string, refresh_token, {
          expires: refreshTokenExpires,
        });

        return response.data.data;
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};
