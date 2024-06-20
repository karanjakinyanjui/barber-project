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
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton variant="rounded" width={150} height={30} />
            </TableHead>
            <TableHead>
              <Skeleton variant="rounded" width={100} height={30} />
            </TableHead>
            <TableHead>
              <Skeleton variant="rounded" width={80} height={30} />
            </TableHead>
            <TableHead>
              <Skeleton variant="rounded" width={50} height={30} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction}>
              <TableCell className="font-medium">
                <Skeleton variant="rounded" width={150} height={30} />
              </TableCell>
              <TableCell>
                <Skeleton variant="rounded" width={100} height={30} />
              </TableCell>
              <TableCell>
                <Skeleton variant="rounded" width={80} height={30} />
              </TableCell>
              <TableCell className="flex">
                <Skeleton variant="rounded" width={50} height={30} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default loading;
