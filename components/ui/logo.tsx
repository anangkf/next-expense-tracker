import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";

export default function Logo() {
  return (
    <Badge className="text-semibold text-brand-600">
      <div className="flex items-center justify-between gap-2 p-1">
        <Wallet size={18} /> Exfens Trekker
      </div>
    </Badge>
  );
}
