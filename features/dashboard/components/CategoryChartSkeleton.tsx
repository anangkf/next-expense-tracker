import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryChartSkeleton() {
  return (
    <div className="col-span-2 flex items-center justify-between gap-2 w-full">
      <div className="flex items-center justify-center w-1/2 p-4">
        <Skeleton className="w-42 h-42 rounded-full" />
      </div>
      <div className="flex flex-col gap-2 w-1/2">
        <Skeleton className="h-8 w-full rounded-sm" />
        <Skeleton className="h-8 w-full rounded-sm" />
        <Skeleton className="h-8 w-full rounded-sm" />
        <Skeleton className="h-8 w-full rounded-sm" />
      </div>
    </div>
  );
}
