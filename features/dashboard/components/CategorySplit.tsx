"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { formatCurrency } from "@/lib/formatCurrency";
import CategorySplitChart, { SpendingByCategory } from "./CategorySplitChart";
import { useGetCategories } from "@/features/categories/services/useCategories";
import { generateColorScheme } from "@/lib/color-generator";
import CategoryFilter from "./CategoryFilter";
import { DateRange, Matcher } from "react-day-picker";
import {
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { useState } from "react";
import CategoryChartSkeleton from "./CategoryChartSkeleton";
import EmptyData from "@/components/shared/EmptyData";
import ListWrapperWithToggle from "@/components/shared/ListWrapperWithToggle";
import DrawerCreateTransaction from "@/features/expenses/components/DrawerCreateTransaction";
import { Button } from "@/components/ui/button";
const today = new Date();
export const INITIAL_DATE_RANGE = {
  from: startOfMonth(today),
  to: endOfMonth(today),
};

export default function CategorySplit() {
  // STATES
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    INITIAL_DATE_RANGE,
  );
  const disabledDates: Matcher = {
    before: startOfYear(today),
    after: endOfYear(today),
  };
  const { data: categories, isPending: isLoadingCategories } = useGetCategories(
    {
      limit: 25,
      withTotal: true,
      expense_start_date: format(dateRange?.from as Date, "yyyy-MM-dd"),
      expense_end_date: format(dateRange?.to as Date, "yyyy-MM-dd"),
    },
  );
  const colorScheme = generateColorScheme(categories?.length || 0);

  const categoriesHavingExpense: SpendingByCategory[] =
    categories
      ?.filter(
        ({ total_expense, type }) =>
          (total_expense as number) > 0 && type === "expense",
      )
      .sort((a, b) => b?.total_expense - a?.total_expense)
      .map((c, idx) => ({
        id: c.id,
        name: c.name,
        total_expense: c.total_expense || 0,
        color: colorScheme[idx],
      })) || [];

  // HANDLERS
  const handleDateRangeChange = (dateRange: DateRange | undefined) => {
    setDateRange(dateRange);
  };

  return (
    <Card className="gap-2 p-2 h-fit">
      <CardHeader className="p-0">
        <CardTitle className="text-lg">Category split</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {/* FILTER */}
        <CategoryFilter
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          disabledDates={disabledDates}
        />
        {/* CHART */}
        <CategoryChartContent
          loading={isLoadingCategories}
          categories={categoriesHavingExpense}
        />
      </CardContent>
    </Card>
  );
}

type CategoryChartContentProps = {
  loading: boolean;
  categories: SpendingByCategory[];
};
const CategoryChartContent = ({
  loading,
  categories,
}: CategoryChartContentProps) => {
  const colorScheme = generateColorScheme(categories?.length || 0);

  if (!categories?.length) {
    return (
      <EmptyData
        className="w-full"
        title="No Expense Data"
        description="No expenses yet for this period! Begin by logging your first expense."
        buttonLabel="Create Expense"
        buttonComponent={<DrawerCreateTransaction buttonTrigger={<Button>Add Expense</Button>} />}
      />
    );
  }

  if (loading) {
    return <CategoryChartSkeleton />;
  }

  return (
    <div className="grid md:grid-cols-2 gap-2 p-2">
      <div className="col-span-2 md:col-span-1 min-h-[200px] h-max">
        <CategorySplitChart spendingByCategory={categories} />
      </div>

      <div className="col-span-2 md:col-span-1 flex flex-col gap-2 overflow-auto">
        <ListWrapperWithToggle
          items={categories}
          renderItem={({ id, name, total_expense }, idx) => (
            <Item key={id} className="w-full bg-brand-50/50 p-2 py-1 gap-1">
              <ItemMedia>
                <span
                  className="w-4 h-4 rounded-xs"
                  style={{ backgroundColor: colorScheme[idx] }}
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="gap-1 items-center text-brand-900 line-clamp-1">
                  {name}
                </ItemTitle>
              </ItemContent>
              <ItemContent className="flex-none text-center">
                <ItemDescription>
                  {formatCurrency({
                    value: total_expense || 0,
                    currency: "IDR",
                    decimal: 0,
                  })}
                </ItemDescription>
              </ItemContent>
            </Item>
          )}
        />
        {/* {categories?.map(({ id, name, total_expense }, idx) => (
          <Item key={id} className="w-full bg-brand-50/50 p-2 py-1 gap-1">
            <ItemMedia>
              <span
                className="w-4 h-4 rounded-xs"
                style={{ backgroundColor: colorScheme[idx] }}
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="gap-1 items-center text-brand-900 line-clamp-1">
                {name}
              </ItemTitle>
            </ItemContent>
            <ItemContent className="flex-none text-center">
              <ItemDescription>
                {formatCurrency({
                  value: total_expense || 0,
                  currency: "IDR",
                  decimal: 0,
                })}
              </ItemDescription>
            </ItemContent>
          </Item>
        ))} */}
      </div>
    </div>
  );
};
