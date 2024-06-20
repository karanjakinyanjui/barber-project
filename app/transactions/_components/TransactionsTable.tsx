import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Transaction, User } from "@prisma/client";
import Link from "next/link";
import { getAdmin } from "@/auth";
import AssignModal from "./AssignModal";
import prisma from "@/prisma/client";

export interface TransactionWithUser extends Transaction {
  User: User | null;
}
interface TransactionsTableProps {
  transactions: TransactionWithUser[];
  offset: number | null;
  users?: User[];
}

export async function TransactionsTable({
  transactions,
  offset,
  users,
}: TransactionsTableProps) {
  return (
    <>
      <Table className="">
        <TableHeader>
          <TableRow className=" ">
            <TableHead className="max-w-fit font-bold ">
              Transaction ID
            </TableHead>
            <TableHead className="font-bold ">Date</TableHead>
            <TableHead className="font-bold ">Amount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.TransID}
              transaction={transaction}
              users={users || []}
            />
          ))}
        </TableBody>
      </Table>
      {offset !== null && (
        <Button className="mt-4 w-40" variant="secondary">
          <Link href={`/?offset=${offset}`}>Next Page</Link>
        </Button>
      )}
    </>
  );
}

async function TransactionRow({
  transaction,
  users,
}: {
  transaction: TransactionWithUser;
  users: User[];
}) {
  const formatDate = (dateStr: string) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    // return `${day}-${month}-${year}`;
    return `${day} ${month}`;
  };

  const admin = await getAdmin();
  let userChoices = users.map((i) => ({
    label: i.name || "",
    value: i.id || "",
  }));

  return (
    <TableRow>
      <TableCell className="font-medium whitespace-nowrap">
        {transaction.TransID}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {transaction.TransactionTime.toDateString()}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {transaction.TransAmount}
      </TableCell>
      <TableCell className="flex">
        {admin && <AssignModal transaction={transaction} users={userChoices} />}
      </TableCell>
    </TableRow>
  );
}
