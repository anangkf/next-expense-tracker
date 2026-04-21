"use client";

import { Button } from "@/components/ui/button";
import Combobox from "@/components/ui/combobox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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

const snapPoints = ["148px", "355px", 1];

export default function DrawerCreateTransaction() {
  const { desktop } = useDeviceType();
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      amount: 0,
      category: "", //category_id
    },
    mode: "onChange",
  });

  const { data: categories } = useGetCategories({});

  const categoryOptions =
    categories?.map((category) => ({
      label: category.name,
      value: String(category.id),
    })) || [];

  return (
    <Drawer
      direction={desktop ? "right" : "bottom"}
      modal={false}
      {...((!desktop && snapPoints) || undefined)}
    >
      <DrawerTrigger asChild>
        <Button className="capitalize">
          <Plus />
          Add Transaction
        </Button>
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=top]:max-h-[80vh]">
        <DrawerHeader>
          <DrawerClose className="absolute right-4 top-4 cursor-pointer">
            <X />
          </DrawerClose>
          <DrawerTitle>Add Transaction</DrawerTitle>
          <DrawerDescription>Add a new transaction.</DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-auto px-4">
          <form onSubmit={() => {}} className="py-2">
            <div className="grid w-full items-center">
              <Label htmlFor="name" className="mb-2 mt-4">
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
              <Label htmlFor="amount" className="mb-2 mt-4">
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
              <Label htmlFor="category" className="mb-2 mt-4">
                Category
              </Label>
              <Controller
                name="category"
                control={control}
                rules={{
                  required: "Category is required.",
                }}
                render={({ field }) => (
                  <Combobox
                    options={categoryOptions}
                    className="w-full"
                    contentAlign="start"
                    // value={currency}
                    handleSelect={(value) => field.onChange(value)}
                  />
                )}
              />
              {errors.category && (
                <p className="text-error-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            {/* <CardAction className="flex flex-col gap-2 mt-4 w-full">
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
      </CardAction> */}
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
