import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button, ButtonProps } from "./button";

type ConfirmDialogProps = {
  buttonLabel: string;
  buttonVariant?: ButtonProps["variant"];
  buttonIcon?: React.ReactNode;
  title: string;
  description?: string;
  confirmLabel?: string;
  confirmIcon?: React.ReactNode;
  confirmVariant?: ButtonProps["variant"];
  onConfirm: () => void;
  cancelLabel?: string;
  cancelIcon?: React.ReactNode;
  cancelVariant?: ButtonProps["variant"];
  onCancel?: () => void;
};

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const {
    buttonLabel,
    buttonVariant = "outline",
    buttonIcon,
    title,
    description,
    confirmLabel = "Confirm",
    confirmIcon,
    confirmVariant = "default",
    onConfirm = () => {},
    cancelLabel = "Cancel",
    cancelIcon,
    cancelVariant = "outline",
    onCancel = () => {},
  } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={buttonVariant}>
          {buttonIcon}
          {buttonLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant={cancelVariant} onClick={onCancel}>
            {cancelIcon}
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction variant={confirmVariant} onClick={onConfirm}>
            {confirmIcon}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
