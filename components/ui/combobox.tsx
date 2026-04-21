import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button, ButtonProps } from "./button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { cn } from "@/lib/utils";

interface ComboboxProps extends ButtonProps {
  options: Array<{
    label: string;
    value: string;
  }>;
  placeholder?: string;
  searchPlaceholder?: string;
  labelNoOptions?: string;
  contentAlign?: "start" | "center" | "end";
  handleSelect?: (value: string) => void;
}

export default function Combobox(props: Readonly<ComboboxProps>) {
  const {
    options,
    placeholder = "Select option...",
    searchPlaceholder = "Search option...",
    labelNoOptions = "No option found.",
    contentAlign,
    className,
    handleSelect = () => { },
  } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const valueToLabel = Object.fromEntries(
    options.map((opt) => [opt.value, opt.label])
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[200px] p-0", className)}
        align={contentAlign}
      >
        <Command
          filter={(value, search) => {
            const label = valueToLabel[value] ?? ""
            return label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }}
        >
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{labelNoOptions}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    handleSelect?.(currentValue);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
