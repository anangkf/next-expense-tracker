"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { useState } from "react";
import { DateRange, Matcher } from "react-day-picker";
import { INITIAL_DATE_RANGE } from "./CategorySplit";

const filterOptions = [
  {
    id: "absolute",
    label: "Absolute date range",
    value: "absolute",
  },
  {
    id: "relative",
    label: "Relative to today",
    value: "relative",
  },
];

const today = new Date();
const relativeFilters = [
  {
    label: "Today",
    value: "today",
    filter: { from: startOfDay(today), to: endOfDay(today) },
  },
  {
    label: "This week",
    value: "thisWeek",
    filter: { from: startOfWeek(today), to: endOfWeek(today) },
  },
  {
    label: "This month",
    value: "thisMonth",
    filter: { from: startOfMonth(today), to: endOfMonth(today) },
  },
  {
    label: "This year",
    value: "thisYear",
    filter: { from: startOfYear(today), to: endOfYear(today) },
  },
  {
    label: "Yesterday",
    value: "yesterday",
    filter: {
      from: startOfDay(subDays(today, 1)),
      to: endOfDay(subDays(today, 1)),
    },
  },
  {
    label: "Last week",
    value: "lastWeek",
    filter: {
      from: startOfWeek(subWeeks(today, 1)),
      to: endOfWeek(subWeeks(today, 1)),
    },
  },
  {
    label: "Last month",
    value: "lastMonth",
    filter: {
      from: startOfMonth(subMonths(today, 1)),
      to: endOfMonth(subMonths(today, 1)),
    },
  },
  {
    label: "Last year",
    value: "lastYear",
    filter: {
      from: startOfYear(subYears(today, 1)),
      to: endOfYear(subYears(today, 1)),
    },
  },
];

type CategorySplitProps = {
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
  dateRange: DateRange | undefined;
  disabledDates: Matcher | Matcher[];
};

export default function CategoryFilter({
  onDateRangeChange,
  dateRange,
  disabledDates,
}: CategorySplitProps) {
  // STATES
  const [filter, setFilter] = useState(filterOptions[0].value);
  const [selectedRelativeFilter, setSelectedRelativeFilter] = useState(
    relativeFilters[0].value,
  );

  // HANDLERS
  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (value === "relative") {
      const relativeFilter = relativeFilters.find(
        (f) => f.value === selectedRelativeFilter,
      )?.filter;
      onDateRangeChange(relativeFilter);
      return;
    }
    onDateRangeChange(INITIAL_DATE_RANGE);
  };

  const handleRelativeFilterChange = (value: string) => {
    setSelectedRelativeFilter(value);
    const relativeFilter = relativeFilters.find(
      (f) => f.value === value,
    )?.filter;
    onDateRangeChange(relativeFilter);
  };

  return (
    <FieldGroup className="col-span-2 grid grid-cols-2 gap-2">
      <Field className="w-full">
        <Select defaultValue={filter} onValueChange={handleFilterChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent position={"popper"}>
            <SelectGroup>
              {filterOptions.map(({ id, label, value }) => (
                <SelectItem key={id} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      {filter === "relative" && (
        <Field className="w-full">
          <Select
            defaultValue={relativeFilters[0].value}
            onValueChange={handleRelativeFilterChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position={"popper"}>
              <SelectGroup>
                {relativeFilters.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      )}
      <Field className={`col-span-${filter === "absolute" ? 1 : 2} w-full`}>
        <DateRangePicker
          date={dateRange}
          onDateRangeChange={onDateRangeChange}
          placeholder="Pick a date range"
          disabled={filter === "relative" || disabledDates}
          // displayedMonths={2}
        />
      </Field>
    </FieldGroup>
  );
}
