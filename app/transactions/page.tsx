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

  const handleClaimed = async ({ TransID }: Transaction) => {
    "use server";
    await prisma.transaction.update({
      where: {
        TransID,
      },
      data: {
        userId: localStorage.getItem("app_user_id") || "",
      },
    });
    window.location.reload();
  };

  return <TransactionList transactions={transactions} />;
};

export default TransactionsPage;
