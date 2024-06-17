import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import TransactionCard from "./TransactionCard";

export default function SingleTransaction() {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        <div className="flex flex-row justify-between">
          <div className="">transaId</div>
          <div className="">Date</div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <TransactionCard transTime={""} transAmount={""} transID={""} />
      </CollapsibleContent>
    </Collapsible>
  );
}
