import api from "@/lib/client/api";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        await api.post("/auth/logout");
      } catch (error: any) {
        throw error?.response?.data;
      }
    },
  });
};
