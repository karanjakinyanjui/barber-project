import { getDBUser, getUser } from "@/auth";
import TransactionList from "@/components/transactions/TransactionList";
import prisma from "@/prisma/client";
import React from "react";
import {
  TransactionWithUser,
  TransactionsTable,
} from "./transactions/_components/TransactionsTable";
import Filters from "@/components/transactions/Filters";
import { getTransactions } from "@/lib/transactions";

interface Props {
  searchParams: {
    offset?: string;
    start?: string;
    end?: string;
    date?: string;
    user?: string;
    claimed?: boolean;
  };
}

const TransactionsPage = async ({ searchParams }: Props) => {
  const user = await getDBUser();
  const isAdmin = user?.role === "ADMIN";
  if (!user) return null;
  const { date, end, start, claimed, user: userName } = searchParams;

  const urlSearchParams =
    "?" +
    new URLSearchParams({
      date: date || "",
      end: end || "",
      start: start || "",
      claimed: claimed ? "1" : "",
      user: userName || "",
    }).toString();

  const transactions = await getTransactions(
    { dateStr: date, end, start, claimed, userName },
    isAdmin
  );
  let users = await prisma.user.findMany();

  return (
    <div className="p-1 md:p-4">
      {isAdmin ? (
        <>
          <Filters params={urlSearchParams} users={users} />
          <TransactionsTable
            users={users}
            transactions={transactions as TransactionWithUser[]}
            offset={null}
          />
        </>
      ) : (
        <TransactionList transactions={transactions} />
      )}
    </div>
  );
};

export default TransactionsPage;
