import { getUser } from "@/auth";
import TransactionList from "@/components/transactions/TransactionList";
import prisma from "@/prisma/client";
import { Transaction } from "@prisma/client";
import React from "react";

const TransactionsPage = async () => {
  const user = await getUser();
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user?.id,
    },
  });
  return <TransactionList transactions={transactions} />;
};

export default TransactionsPage;
