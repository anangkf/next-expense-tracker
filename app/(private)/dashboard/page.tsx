import CategorySplit from "@/features/dashboard/components/CategorySplit";
import SpendingOverview from "@/features/dashboard/components/SpendingOverview";

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="lg:col-span-2 border border-brand-500">search</div>
      <SpendingOverview />
      <CategorySplit />
      <div className="border border-brand-500">Item 3</div>
      <div className="border border-brand-500">Item 4</div>
    </div>
  );
}
