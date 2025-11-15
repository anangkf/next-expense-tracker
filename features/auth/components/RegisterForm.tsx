"use client";

import { Button } from "@components/ui/button";
import { CardAction } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { LoaderCircle, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRegister } from "../services/useRegister";
import { toast } from "sonner";
import { RegisterFormValues } from "../types/register";
import { regexEmail, regexPassword } from "../const/regext";

const defaultValues = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValues>({
    defaultValues,
    mode: "onChange",
  });

  const { isPending, mutate } = useRegister();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const { confirmPassword, ...payload } = data;
    mutate(payload, {
      onSuccess: () => {
        toast.success("Register success");
        router.push("/onboarding?step=1");
      },
      onError: (error: any) => {
        toast.error("Register failed", {
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
              message: "Email invalid.",
            },
          }}
          render={({ field }) => (
            <Input
              id="email"
              // type="email"
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
        <Label htmlFor="name" className="mb-2 mt-4">
          Name
        </Label>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Name is required.",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters long.",
            },
          }}
          render={({ field }) => (
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...field}
            />
          )}
        />
        {errors.name && (
          <p className="text-error-500 text-sm">{errors.name.message}</p>
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
            pattern: {
              value: regexPassword,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
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
      <div className="grid w-full items-center">
        <Label htmlFor="password" className="mb-2 mt-4">
          Confirm Password
        </Label>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirm password is required.",
            validate: (value) =>
              value === watch("password") || "Passwords doesn't match",
          }}
          render={({ field }) => (
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
              {...field}
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-error-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <CardAction className="mt-4 w-full">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <LoaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            <UserRoundPlus />
          )}
          Create Account
        </Button>
        <div className="flex justify-center items-center gap-1 mt-4">
          <span>Already have an account?</span>
          <Link href="/login">
            <Button variant="link" className="text-brand-500 p-0">
              Login
            </Button>
          </Link>
        </div>
      </CardAction>
    </form>
  );
}
