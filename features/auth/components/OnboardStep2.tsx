import { Button } from "@/components/ui/button";
import { CardAction } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import {
  Bus,
  Check,
  CreditCard,
  Flame,
  ParkingMeter,
  Wifi,
  X,
} from "lucide-react";

const baseTemplates = [
  {
    id: 1,
    name: "Commute (Daily)",
    icon: <Bus />,
  },
  {
    id: 2,
    name: "Credit Card Bill",
    icon: <CreditCard />,
  },
  {
    id: 3,
    name: "Internet",
    icon: <Wifi />,
  },
  {
    id: 4,
    name: "Utilities: Gas",
    icon: <Flame />,
  },
  {
    id: 5,
    name: "Parking",
    icon: <ParkingMeter />,
  },
];

export default function OnboardStep2() {
  return (
    <form action="">
      <div className="grid w-full items-center">
        <Label className="mb-2 mt-4">Recommended templates</Label>
        <div className="flex flex-wrap gap-4 mt-2">
          {baseTemplates.map((template) => (
            <Toggle
              key={template.id}
              variant="outline"
              aria-label={template.name}
            >
              {template.icon}
              <span>{template.name}</span>
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
            <X />
            No, thanks
          </Button>
          <Button type="submit" className="w-1/2 md:w-2/3">
            <Check />
            Add templates
          </Button>
        </div>
        <div className="flex justify-center items-center gap-1 mt-4">
          Prefer to start clean? You can configure templates later in{" "}
          <span className="text-brand-500 text-semibold">Templates</span>
        </div>
      </CardAction>
    </form>
  );
}
