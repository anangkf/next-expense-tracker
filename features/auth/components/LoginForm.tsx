"use client";

import { AlertDescription } from "@components/ui/alert";
import { Button } from "@components/ui/button";
import { CardAction } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Clock, LoaderCircle, ShieldCheck, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { setCookie } from "../utils/setCookie";
import constant from "@/lib/constant";
import { toast } from "sonner";
import { useLogin } from "../services/useLogin";
import { LoginFormValues, LoginPayload } from "../types/login";
import { regexEmail } from "../const/regext";
import { useRouter } from "next/navigation";

const defaultValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues,
    mode: "onChange",
  });

  const { isPending, mutate } = useLogin();

  const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
    mutate(data, {
      onSuccess: (data) => {
        const { token, refresh_token } = data;
        setCookie(
          constant.TOKEN_KEYNAME as string,
          token,
          constant.EXPIRE_DAYS
        );
        setCookie(
          constant.REFRESH_TOKEN_KEYNAME as string,
          refresh_token,
          constant.EXPIRE_DAYS
        );

        toast.success("Login success");
        router.push("/");
      },
      onError: (error: any) => {
        toast.error("Login failed", {
          description: `${error?.message}: ${error?.error}`,
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full items-center">
        <Label htmlFor="email" className="mb-2 mt-4">
          Email
        </Label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required.",
            pattern: {
              value: regexEmail,
              message: "Email is not valid.",
            },
          }}
          render={({ field }) => (
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...field}
            />
          )}
        />
        {errors.email && (
          <p className="text-error-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="grid w-full items-center">
        <Label htmlFor="password" className="mb-2 mt-4">
          Password
        </Label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
          }}
          render={({ field }) => (
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...field}
            />
          )}
        />
        {errors.password && (
          <p className="text-error-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <CardAction className="flex flex-col gap-2 mt-4 w-full">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <LoaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            <UserRoundPlus />
          )}
          Login
        </Button>
        <AlertDescription className="flex items-center gap-1">
          <ShieldCheck size={16} />
          Your data is encripted in transit and at rest.
        </AlertDescription>
        <AlertDescription className="flex items-center gap-1">
          <Clock size={16} />
          Session remains active for 7 days on this device.
        </AlertDescription>
        <div className="flex justify-center items-center gap-1">
          <span>Don&apos;t have an account?</span>
          <Link href="/register">
            <Button variant="link" className="text-brand-500 p-0">
              Create one
            </Button>
          </Link>
        </div>
      </CardAction>
    </form>
  );
}
