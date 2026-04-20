export default {
  BASE_URL_API: process.env.NEXT_PUBLIC_BASE_URL_API || "http://localhost:8080",
  EXPIRE_DAYS: Number(process.env.NEXT_PUBLIC_EXPIRE_DAYS) || 1,
  REFRESH_EXPIRE_DAYS: Number(process.env.NEXT_PUBLIC_REFRESH_EXPIRE_DAYS) || 7,
  TOKEN_KEYNAME: process.env.NEXT_PUBLIC_TOKEN_KEYNAME || "token",
  REFRESH_TOKEN_KEYNAME: process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEYNAME || "refresh_token",
};
