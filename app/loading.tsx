import Filters from "@/components/transactions/Filters";
import React from "react";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@mui/material";

const loading = () => {
  const transactions = [1, 2, 3, 4];
  return (
    <div>
      <Filters params="" users={[]} />
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
            <TableRow key={transaction}>
              <TableCell className="font-medium">
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell className="flex">
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default loading;
