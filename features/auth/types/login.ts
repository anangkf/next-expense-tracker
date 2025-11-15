import {
  RegisterFormValues,
  RegisterPayload,
  RegisterResponse,
} from "./register";

export type LoginPayload = Omit<RegisterPayload, "name">;
export type LoginResponse = Omit<RegisterResponse, "user">;
export type LoginFormValues = Omit<
  RegisterFormValues,
  "name" | "confirmPassword"
>;
