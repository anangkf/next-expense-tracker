"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  BookOpenCheck,
  ChartPie,
  Check,
  ClipboardCheck,
  Gauge,
  Globe,
  LayoutDashboard,
  Sparkles,
  UserCog,
} from "lucide-react";
import { useRouter } from "next/navigation";

const summary = [
  {
    id: "categories",
    name: "Quick categories",
    icon: <LayoutDashboard size={18} />,
    items: [
      "Groceries",
      "Transport",
      "Rent",
      "Utilities",
      "Dining",
      "Subscriptions",
    ],
  },
  {
    id: "templates",
    name: "Tategories",
    icon: <ClipboardCheck size={18} />,
    items: ["Commute", "Internet", "Credit Card", "Utilities: Gas", "Parking"],
  },
  {
    id: "preferences",
    name: "Preferences",
    icon: <Globe size={18} />,
    items: ["Currency"],
  },
];

export default function OnboardFinal() {
  const router = useRouter();
  return (
    <div>
      <div className="grid w-full items-center">
        <Label className="mb-2 mt-4">What we prepared</Label>
        <div className="flex flex-wrap gap-4 mt-2">
          {summary.map((item) => {
            const firstThreeItems = item.items.slice(0, 3);
            const itemsMinusOne = item.items.slice(0, -1);
            const lastItem = item.items.at(-1);
            let itemList = "";

            switch (true) {
              case item.items.length > 3:
                itemList = firstThreeItems.join(", ").concat(" and more");
                break;
              case item.items.length > 1:
                itemList = itemsMinusOne.join(", ").concat(" and " + lastItem);
                break;
              default:
                itemList = item.items.at(0) || "";
            }

            return (
              <Badge
                key={item.id}
                className="w-full justify-between items-start px-3 py-2 rounded-md"
              >
                <div className="flex gap-1 text-brand-600 max-w-1/3">
                  {item.icon}
                  <span className="flex flex-wrap w-full">{item.name}</span>
                </div>
                {itemList && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Check size={14} /> {itemList}
                  </div>
                )}
              </Badge>
            );
          })}
        </div>
      </div>
      <div className="grid w-full items-center">
        <Label className="mb-2 mt-4">Quick tips</Label>
        <div className="flex flex-col gap-1">
          <CardDescription className="flex items-center gap-1">
            <Sparkles size={16} />
            Use a template from Add expense to log faster
          </CardDescription>
          <CardDescription className="flex items-center gap-1">
            <ChartPie size={16} />
            Check Dashboard for category splits
          </CardDescription>
          <CardDescription className="flex items-center gap-1">
            <UserCog size={16} />
            Adjust anything later in Profile
          </CardDescription>
        </div>
      </div>
      <div className="mt-4 w-full">
        <div className="flex justify-between items-stretch gap-2">
          <Button
            type="button"
            variant={"outline-brand"}
            className="w-1/2 md:w-1/3 text-left"
            onClick={() => router.back()}
          >
            <BookOpenCheck />
            Review Templates
          </Button>
          <Button className="w-1/2 md:w-2/3 text-left">
            <Gauge />
            Go to Dashboard
          </Button>
        </div>
        <div className="text-muted-foreground text-xs mt-4">
          You'll find templates anytime under{" "}
          <span className="text-brand-500 font-semibold">Templates</span>
        </div>
      </div>
    </div>
  );
}
