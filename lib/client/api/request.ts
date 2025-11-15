import constant from "@/lib/constant";
import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({
  baseURL: `${constant.BASE_URL_API}/api/v1`,
  timeout: 30_000,
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie(constant.TOKEN_KEYNAME as string);

    const authRoutes = ["/auth/login", "/auth/register"];

    if (token && !authRoutes.some((route) => config.url?.includes(route))) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
