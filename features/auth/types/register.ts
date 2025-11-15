import { User } from ".";

export type RegisterPayload = {
  email: string;
  name: string;
  password: string;
};

export type RegisterResponse = {
  refresh_token: string;
  token: string;
  user: User;
};

export interface RegisterFormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}
