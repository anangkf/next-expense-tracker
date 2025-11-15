import api from "@/lib/client/api";
import constant from "@/lib/constant";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        await api.post("/auth/logout");
        deleteCookie(constant.TOKEN_KEYNAME as string);
        deleteCookie(constant.REFRESH_TOKEN_KEYNAME as string);
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};
