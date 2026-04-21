import CategorySplit from "@/features/dashboard/components/CategorySplit";
import RecentTransactions from "@/features/dashboard/components/RecentTransactions";
import SpendingOverview from "@/features/dashboard/components/SpendingOverview";
import DrawerCreateTransaction from "@/features/expenses/components/DrawerCreateTransaction";

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="lg:col-span-2 flex flex-row-reverse">
        <DrawerCreateTransaction />
      </div>
      <SpendingOverview />
      <CategorySplit />
      <div className="lg:col-span-2">
        <RecentTransactions />
      </div>
    </div>
  );
}
