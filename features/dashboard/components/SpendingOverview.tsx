import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatCurrency";
import SpendingChart from "./SpendingChart";

const overviewData = [
  {
    id: "total-spent",
    title: "Total spent",
    value: "5454850",
  },
  {
    id: "this-week",
    title: "This week",
    value: "816450",
  },
  {
    id: "recurring",
    title: "Recurring",
    value: "1212000",
  },
  {
    id: "left-in-budget",
    title: "Left in budget",
    value: "780000",
  },
];

export default function SpendingOverview() {
  return (
    <Card className="gap-2 p-2">
      <CardHeader className="p-0">
        <CardTitle className="text-lg">Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2 overflow-auto">
        {overviewData.map(({ id, title, value }) => (
          <Card key={id} className="w-full bg-brand-50/50 p-2 gap-0">
            <CardHeader className="p-0">
              <CardTitle className="text-xs text-muted-foreground">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-sm text-brand-900 font-semibold">
                {formatCurrency({ value, currency: "IDR", decimal: 0 })}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* CHART */}
        <div className="col-span-2 md:col-span-4 h-[200px]">
          <SpendingChart />
        </div>
      </CardContent>
    </Card>
  );
}
