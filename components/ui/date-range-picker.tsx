"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange, Matcher } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DateRangePickerProps = {
  date?: DateRange;
  onDateRangeChange: (range?: DateRange) => void;
  placeholder?: string;
  className?: string;
  disabled?: Matcher | Matcher[];
  displayedMonths?: number;
};

export function DateRangePicker({
  date,
  onDateRangeChange,
  placeholder = "Pick a date range",
  className,
  disabled = false,
  displayedMonths = 1,
}: DateRangePickerProps) {
  const isButtonDisabled = typeof disabled === "boolean" && disabled;

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            disabled={isButtonDisabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy-MM-dd")} -{" "}
                  {format(date.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(date.from, "yyyy-MM-dd")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            autoFocus={true}
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateRangeChange}
            // numberOfMonths={displayedMonths}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
