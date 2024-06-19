import { getAdmin, getUser } from "@/auth";
import TransactionList from "@/components/transactions/TransactionList";
import prisma from "@/prisma/client";
import React from "react";
import { TransactionsTable } from "./transactions/_components/TransactionsTable";

const TransactionsPage = async () => {
  const user = await getUser();
  // console.log(user);

  const admin = await getAdmin();

  if (!user) return null;

  const transactions = await prisma.transaction.findMany({
    // where: {
    //   userId: null,
    // },
    include: {
      User: true,
    },
  });

  console.log(transactions);

  return (
    <div className="p-1 md:p-4">
      {admin ? (
        <TransactionsTable transactions={transactions} offset={null} />
      ) : (
        <TransactionList transactions={transactions} />
      )}
    </div>
  );
};

export default TransactionsPage;
