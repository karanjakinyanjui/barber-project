import { getUser } from "@/auth";
import TransactionList from "@/components/transactions/TransactionList";
import prisma from "@/prisma/client";
import { Transaction } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import { TransactionsTable } from "./transactions/_components/TransactionsTable";

const TransactionsPage = async () => {
  const user = await getUser();
  // console.log(user);

  if (!user) return null;

  const transactions = await prisma.transaction.findMany({
    // where: {
    //   userId: null,
    // },
    include: {
      User: true,
    },
  });

  return (
    <div className="p-1 md:p-4">
      <TransactionList transactions={transactions} />
      <TransactionsTable transactions={transactions} offset={null} />
    </div>
  );
};

export default TransactionsPage;
