import constant from "@/lib/constant";
import axios from "axios";

const api = axios.create({
  baseURL: `${constant.BASE_URL_API}/api/v1`,
  timeout: 30_000,
});

export default api;
