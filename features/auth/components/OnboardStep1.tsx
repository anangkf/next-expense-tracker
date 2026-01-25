"use client";

import { Button } from "@/components/ui/button";
import { CardAction, CardDescription } from "@/components/ui/card";
import Combobox from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { currencies } from "@/lib/currencies";
import { ArrowRight, Info, SkipForward, Sparkles } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDefaultCategories } from "@/features/categories/services/useCategories";
import { Category, CategoryRequest } from "@/features/categories/types";
import {
  useOnboardingDispatch,
  useOnboardingState,
} from "../context/OnboardingContext";

const currencyOptions = currencies.map((currency) => ({
  label: `${currency.symbol} - ${currency.code}`,
  value: currency.code,
}));

const transformCategory = (category: Category): CategoryRequest => ({
  name: category.name,
  type: category.type,
  bucket_type_id: category.bucket_type_id,
  icon_name: category.icon_name,
});

export default function OnboardStep1() {
  const router = useRouter();
  const dispatch = useOnboardingDispatch();
  const { categories, currency } = useOnboardingState();

  // SERVICES
  const { data: defaultCategories, isPending: isLoadingCategories } =
    useGetDefaultCategories();

  const toggleCategory = (category: Category) => {
    const categoryRequest = transformCategory(category);

    dispatch({ type: "TOGGLE_CATEGORY", payload: categoryRequest });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/onboarding?step=2");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center">
        <Label htmlFor="defaultCurrency" className="mb-2 mt-4">
          Default Currency
        </Label>
        <Combobox
          options={currencyOptions}
          className="w-full"
          contentAlign="start"
          value={currency}
          handleSelect={(value) =>
            dispatch({ type: "SET_CURRENCY", payload: value })
          }
        />
      </div>
      <div className="grid w-full items-center">
        <Label className="mb-2 mt-4">Quick Categories (suggested)</Label>
        <div className="flex flex-wrap gap-4 mt-2">
          {isLoadingCategories
            ? Array.from({ length: 8 }).map((_, idx) => (
                <Skeleton key={idx} className="w-32 h-8" />
              ))
            : defaultCategories?.map((category) => (
                <Toggle
                  key={category.id}
                  variant="outline"
                  aria-label={category.name}
                  onClick={() => toggleCategory(category)}
                  pressed={categories.some((c) => c.name === category.name)}
                >
                  <DynamicIcon name={category.icon_name as any} />
                  <span>{category.name}</span>
                </Toggle>
              ))}
        </div>
      </div>
      <CardAction className="mt-4 w-full">
        <div className="flex justify-between items-stretch gap-2">
          <Button
            type="button"
            variant={"outline-brand"}
            className="w-1/2 md:w-1/3 text-left"
            onClick={() => router.push("/")}
          >
            <SkipForward />
            Skip for now
          </Button>
          <Button
            type="submit"
            disabled={isLoadingCategories}
            className="w-1/2 md:w-2/3 text-left"
          >
            <ArrowRight />
            Continue
          </Button>
        </div>
        <div className="flex flex-col gap-2 mt-4 w-full">
          <CardDescription className="flex items-center gap-1">
            <Sparkles size={16} />
            You can add more categories later.
          </CardDescription>
          <CardDescription className="flex items-center gap-1">
            <Info size={16} />
            These settings personalize your dashboard and budgets.
          </CardDescription>
        </div>
      </CardAction>
    </form>
  );
}
