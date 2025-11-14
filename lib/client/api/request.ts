import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1`,
  timeout: 30000,
});

export default api;
