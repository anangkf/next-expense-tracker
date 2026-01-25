"use client";

import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  BookOpenCheck,
  ChartPie,
  Check,
  Gauge,
  LoaderCircle,
  Sparkles,
  UserCog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "lucide-react/dynamic";
import { useOnboardingState } from "../context/OnboardingContext";
import { useCreateMultipleCategories } from "@/features/categories/services/useCategories";
import { useCreateMultipleTemplates } from "@/features/templates/services/useTemplates";
import { toast } from "sonner";

export default function OnboardFinal() {
  const router = useRouter();
  const { summary, categories, templates } = useOnboardingState();
  const { mutateAsync: createCategories, isPending: isCreatingCategories } =
    useCreateMultipleCategories(categories);
  const { mutateAsync: createTemplates, isPending: isCreatingTemplates } =
    useCreateMultipleTemplates(templates);

  const handleSaveAll = async () => {
    try {
      if (categories.length || templates.length) {
        await Promise.all([createCategories(), createTemplates()]);
      }
      router.push("/dashboard");
    } catch (error: any) {
      console.log({ error });
      toast.error("Failed to create categories and templates", {
        description: error?.message,
      });
    }
  };

  return (
    <div>
      <div className="grid w-full items-center">
        <Label className="mb-2 mt-4">What we prepared</Label>
        <div className="flex flex-wrap gap-4 mt-2">
          {summary.map((item) => {
            // SKIP IF ITEM HAS NO ITEMS
            if (!item.items.length) {
              return null;
            }

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
                  <DynamicIcon name={item.icon as any} size={18} />
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
            onClick={() => router.push("/onboarding?step=2")}
          >
            <BookOpenCheck />
            Review Templates
          </Button>
          <Button
            className="w-1/2 md:w-2/3 text-left"
            disabled={isCreatingCategories || isCreatingTemplates}
            onClick={handleSaveAll}
          >
            {isCreatingCategories || isCreatingTemplates ? (
              <LoaderCircle className="w-5 h-5 animate-spin" />
            ) : (
              <Check />
            )}
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
