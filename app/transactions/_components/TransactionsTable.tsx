import React from "react";
import claim from "@/public/claim.png";
import Image from "next/image";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Transaction } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import Link from "next/link";

interface TransactionsTableProps {
  transactions: Transaction[];
  offset: number | null;
}

export function TransactionsTable({
  transactions,
  offset,
}: TransactionsTableProps) {
  const formatDate = (dateStr: string) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <form className="border shadow-sm rounded-lg text-white">
        <Table className="">
          <TableHeader>
            <TableRow className=" ">
              <TableHead className="max-w-[150px] font-bold text-white">
                Transaction ID
              </TableHead>
              <TableHead className="font-bold text-white">Date</TableHead>
              <TableHead className="font-bold text-white">Amount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.TransID}
                transaction={transaction}
              />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button className="mt-4 w-40" variant="secondary">
          <Link href={`/?offset=${offset}`}>Next Page</Link>
        </Button>
      )}
    </>
  );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const formatDate = (dateStr: string) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${day}-${month}-${year}`;
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{transaction.TransID}</TableCell>
      <TableCell>{formatDate(transaction.TransTime)}</TableCell>
      <TableCell>{transaction.TransAmount}</TableCell>
      <TableCell className="flex">
        <Image src={claim} alt="Claim" className="mr-2 h-8 w-8 rounded-lg" />
      </TableCell>
    </TableRow>
  );
}
