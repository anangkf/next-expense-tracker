"use client";

import { Button } from "@/components/ui/button";
import { CardAction } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import { useGetDefaultTemplates } from "@/features/templates/services/useTemplates";
import { Template } from "@/features/templates/types";
import { Check, X } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useRouter } from "next/navigation";
import {
  useOnboardingDispatch,
  useOnboardingState,
} from "../context/OnboardingContext";

export default function OnboardStep2() {
  const router = useRouter();
  const dispatch = useOnboardingDispatch();
  const { templates } = useOnboardingState();

  // SERVICES
  const { data: defaultTemplates, isPending: isLoadingTemplates } =
    useGetDefaultTemplates();

  const toggleTemplates = (template: Template) => {
    const { name, amount, category, icon_name } = template;
    dispatch({
      type: "TOGGLE_TEMPLATE",
      payload: { name, amount, category_id: category.id, icon_name },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/onboarding?step=3");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center">
        <Label className="mb-2 mt-4">Recommended templates</Label>
        <div className="flex flex-wrap gap-4 mt-2">
          {isLoadingTemplates
            ? Array.from({ length: 8 }).map((_, idx) => (
                <Skeleton key={idx} className="w-32 h-8" />
              ))
            : defaultTemplates?.map((template) => (
                <Toggle
                  key={template.id}
                  variant="outline"
                  aria-label={template.name}
                  onClick={() => {
                    toggleTemplates(template);
                  }}
                  pressed={templates.some((t) => t.name === template.name)}
                >
                  <DynamicIcon
                    name={template.icon_name as any}
                    className="w-32 h-8"
                  />
                  <span>{template.name}</span>
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
            onClick={() => router.push("/onboarding?step=3")}
          >
            <X />
            No, thanks
          </Button>
          <Button
            type="submit"
            className="w-1/2 md:w-2/3 text-left"
            disabled={isLoadingTemplates}
          >
            <Check />
            Add templates
          </Button>
        </div>
        <div className="text-muted-foreground text-xs mt-4">
          Prefer to start clean? You can configure templates later in{" "}
          <span className="text-brand-500 font-semibold">Templates</span>
        </div>
      </CardAction>
    </form>
  );
}
