import { Button, ButtonProps } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderOpen } from "lucide-react";

type EmptyDataProps = {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonVariant?: ButtonProps["variant"];
  buttonAction?: () => void;
};

export default function EmptyData({
  className,
  icon,
  title = "No Data",
  description,
  buttonLabel,
  buttonVariant = "default",
  buttonAction = () => {},
}: EmptyDataProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon ?? <FolderOpen />}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button variant={buttonVariant} onClick={buttonAction}>
          {buttonLabel ?? "Create Data"}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
