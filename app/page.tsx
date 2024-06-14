import { getUser } from "@/auth";
import TransactionList from "@/components/transactions/TransactionList";
import prisma from "@/prisma/client";
import { Transaction } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const TransactionsPage = async () => {
  const user = await getUser();
  // console.log(user);

  if (!user) return null;

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: null,
    },
  });

  const handleClaimed = async ({ TransID }: Transaction) => {
    "use server";
    await prisma.transaction.update({
      where: {
        TransID,
      },
      data: {
        userId: user?.id!,
      },
    });
    redirect("/");
  };

  return <TransactionList transactions={transactions} />;
};

export default TransactionsPage;
