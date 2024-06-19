import { getDBUser, getUser } from "@/auth";
import TransactionList from "@/components/transactions/TransactionList";
import prisma from "@/prisma/client";
import React from "react";
import { TransactionsTable } from "./transactions/_components/TransactionsTable";

const TransactionsPage = async () => {
  const user = await getDBUser();
  const isAdmin = user?.role === "ADMIN";
  if (!user) return null;

  const where = {
    where: {},
  };
  if (!isAdmin) {
    where.where = {
      userId: null,
    };
  }

  const transactions = await prisma.transaction.findMany({
    ...where,
    include: {
      User: true,
    },
  });

  return (
    <div className="p-1 md:p-4">
      {isAdmin ? (
        <TransactionsTable transactions={transactions} offset={null} />
      ) : (
        <TransactionList transactions={transactions} />
      )}
    </div>
  );
};

export default TransactionsPage;
