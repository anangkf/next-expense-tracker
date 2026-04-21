"use client";

import { Button } from "@/components/ui/button";
import Combobox from "@/components/ui/combobox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetCategories } from "@/features/categories/services/useCategories";
import { useDeviceType } from "@/hooks/use-device-type";
import { Plus, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useCreateExpense } from "../services/useExpenses";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { ChangeEvent, useRef } from "react";

const snapPoints = ["148px", "355px", 1];
const defaultValues = {
  name: "",
  amount: 0,
  category_id: "", //category_id
}

type DrawerCreateTransactionProps = {
  buttonLabel?: string;
  buttonTrigger?: React.ReactNode;
}

export default function DrawerCreateTransaction({ buttonLabel = "Add Transaction", buttonTrigger }: DrawerCreateTransactionProps) {
  const { desktop } = useDeviceType();
  const btnCloseRef = useRef<HTMLButtonElement | null>(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset
  } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const { category_id } = watch()

  const { data: categories, isLoading: loadingCategories } = useGetCategories({});
  const { mutateAsync: createExpense, error, isPending: loadingExpense } = useCreateExpense(watch())

  const categoryOptions =
    categories?.map((category) => ({
      label: category.name,
      value: String(category.id),
    })) || [];

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      await createExpense()
      toast.success("Success created new transaction")
      btnCloseRef.current?.click()
      reset()
    } catch (error: any) {
      console.log(error)
      toast.error("Failed to create transaction", {
        description: `Error: ${error?.message || "Unexpected Error"} `,
      })
    }
  }

  return (
    <Drawer
      direction={desktop ? "right" : "bottom"}
      modal={false}
      {...((!desktop && snapPoints) || undefined)}
    >
      <DrawerTrigger asChild>
        {buttonTrigger || <Button className="capitalize">
          <Plus />
          {buttonLabel}
        </Button>}
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=right]:h-[100vh]">
        <DrawerHeader>
          <DrawerClose className="absolute right-4 top-4 cursor-pointer">
            <X />
          </DrawerClose>
          <DrawerTitle>Add Transaction</DrawerTitle>
          <DrawerDescription>Add a new transaction.</DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 no-scrollbar overflow-auto px-4 py-2 mb-6">
          <div className="grid w-full items-center">
            <Label htmlFor="name" className="mb-2">
              Name
            </Label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required.",
              }}
              render={({ field }) => (
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter the name"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <p className="text-error-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="grid w-full items-center">
            <Label htmlFor="amount" className="mb-2">
              Amount
            </Label>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: "Amount is required.",
                min: {
                  value: 0,
                  message: "Amount must be at least 0.",
                },
              }}
              render={({ field }) => (
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter the amount"
                  {...field}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => field.onChange(Number(event.target.value))}
                />
              )}
            />
            {errors.amount && (
              <p className="text-error-500 text-sm">
                {errors.amount.message}
              </p>
            )}
          </div>
          <div className="grid w-full items-center">
            <Label htmlFor="category" className="mb-2">
              Category
            </Label>
            <Controller
              name="category_id"
              control={control}
              rules={{
                required: "Category is required.",
              }}
              disabled={loadingCategories}
              render={({ field }) => (
                <Combobox
                  options={categoryOptions}
                  className="w-full"
                  contentAlign="start"
                  value={category_id}
                  handleSelect={(value) => field.onChange(Number(value))}
                />
              )}
            />
            {errors.category_id && (
              <p className="text-error-500 text-sm">
                {errors.category_id.message}
              </p>
            )}
          </div>
          <div className="flex justify-between gap-2">
            <Button type="submit" className="w-1/2" disabled={loadingExpense} >
              {loadingExpense && <Spinner />}
              Submit
            </Button>
            <DrawerClose asChild className="w-1/2">
              <Button ref={btnCloseRef} variant="outline">Cancel</Button>
            </DrawerClose>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
