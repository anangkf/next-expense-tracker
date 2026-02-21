import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import { Button } from "../ui/button";

type ListWrapperWithToggleProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  initialDisplayCount?: number;
  seeMoreText?: string;
  seeLessText?: string;
  className?: string;
};
export default function ListWrapperWithToggle<T>({
  items,
  renderItem,
  initialDisplayCount = 5,
  seeMoreText = "See more",
  seeLessText = "See less",
  className,
}: ListWrapperWithToggleProps<T>) {
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? items : items.slice(0, initialDisplayCount);
  const hasMoreItems = items.length > initialDisplayCount;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {displayedItems.map((item, index) => (
        <Fragment key={index}>{renderItem(item, index)}</Fragment>
      ))}

      {hasMoreItems && (
        <Button
          variant="ghost"
          onClick={() => setShowAll(!showAll)}
          className="w-full text-sm text-brand-500 hover:text-brand-600 cursor-pointer"
        >
          {showAll ? seeLessText : seeMoreText}
        </Button>
      )}
    </div>
  );
}
