import { getUser } from "@/auth";
import TransactionList from "@/components/transactions/TransactionList";
import prisma from "@/prisma/client";
import React from "react";

const TransactionsPage = async () => {
  const user = await getUser();
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user?.id,
    },
  });
  return (
    <div className="p-4 ">
      <div className="mb-5">
        <h2 className="text-center text-2xl font-bold text-white md:mb-6 lg:text-3xl">
          My Transactions
        </h2>
      </div>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default TransactionsPage;
