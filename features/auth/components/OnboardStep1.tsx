"use client";

import { AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CardAction } from "@/components/ui/card";
import Combobox from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { currencies } from "@/lib/currencies";
import {
  ArrowRight,
  CircleEllipsis,
  Coffee,
  House,
  Info,
  ShoppingBag,
  SkipForward,
  Sparkles,
  TramFront,
  Tv,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

const baseCategories = [
  {
    id: 1,
    name: "Groceries",
    icon: <ShoppingBag />,
  },
  {
    id: 2,
    name: "Transport",
    icon: <TramFront />,
  },
  {
    id: 3,
    name: "Rent",
    icon: <House />,
  },
  {
    id: 4,
    name: "Utilities",
    icon: <Zap />,
  },
  {
    id: 5,
    name: "Dining",
    icon: <Coffee />,
  },
  {
    id: 6,
    name: "Subscriptions",
    icon: <Tv />,
  },
  {
    id: 7,
    name: "Other",
    icon: <CircleEllipsis />,
  },
];

const currencyOptions = currencies.map((currency) => ({
  label: `${currency.symbol} - ${currency.code}`,
  value: currency.code,
}));

export default function OnboardStep1() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push("/register?step=3");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center">
        <Label htmlFor="defaultCurrency" className="mb-2 mt-4">
          Default Currency
        </Label>
        <Combobox options={currencyOptions} className="w-full" />
      </div>
      <div className="grid w-full items-center">
        <Label className="mb-2 mt-4">Quick Categories (suggested)</Label>
        <div className="flex flex-wrap gap-4 mt-2">
          {baseCategories.map((category) => (
            <Toggle
              key={category.id}
              variant="outline"
              aria-label={category.name}
            >
              {category.icon}
              <span>{category.name}</span>
            </Toggle>
          ))}
        </div>
      </div>
      <CardAction className="mt-4 w-full">
        <div className="flex justify-between items-center gap-2">
          <Button
            type="button"
            variant={"outline-brand"}
            className="w-1/2 md:w-1/3"
          >
            <SkipForward />
            Skip for now
          </Button>
          <Button type="submit" className="w-1/2 md:w-2/3">
            <ArrowRight />
            Continue
          </Button>
        </div>
        <div className="flex flex-col gap-2 mt-4 w-full">
          <AlertDescription className="flex items-center gap-1">
            <Sparkles size={16} />
            You can add more categories later.
          </AlertDescription>
          <AlertDescription className="flex items-center gap-1">
            <Info size={16} />
            These settings personalize your dashboard and budgets.
          </AlertDescription>
        </div>
      </CardAction>
    </form>
  );
}
