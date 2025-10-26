import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";
import React from "react";

export default function Logo() {
  return (
    <Badge className="text-semibold">
      <div className="flex items-center justify-between gap-2 p-1">
        <Wallet size={18} /> Exfens Trekker
      </div>
    </Badge>
  );
}
