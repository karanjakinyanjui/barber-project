import { Transaction } from "@prisma/client";
import React from "react";
import TransactionCard from "./TransactionCard";

interface Props {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: Props) => {
  return (
    <div className="my-4 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-12 md:space-y-0">
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;
