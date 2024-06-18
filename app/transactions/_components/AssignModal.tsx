import { assignTransaction } from "@/components/transactions/actions";
import { Combobox } from "@/components/ui/combobox";
import { Transaction } from "@prisma/client";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  transaction: Transaction;
  users: {
    value: string;
    label: string;
  }[];
}

const AssignModal = ({ transaction, users }: Props) => {
  const handleAssign = async (value: string) => {
    "use server";
    console.log(value);
    assignTransaction(transaction, value).then((res) => {
      toast.success("Transaction assigned successfully");
    });
  };

  return (
    <Combobox
      onValueChange={handleAssign}
      items={users}
      value={transaction.userId || ""}
      placeholder="Assign"
      className={transaction.userId ? "bg-red-900" : ""}
    />
  );
};

export default AssignModal;
