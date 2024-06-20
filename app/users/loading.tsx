import React from "react";
import { Skeleton } from "@mui/material";
import { UserPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";

const SkeletonUsersTable = () => {
  const skeletonRows = [1, 2, 3, 4, 5];

  return (
    <>
      <form className="border shadow-sm rounded-lg ">
        <Table className="">
          <TableHeader>
            <TableRow className="">
              <TableHead className="max-w-[150px] font-bold">
                <Skeleton variant="text" width={80} height={20} />
              </TableHead>
              <TableHead className="font-bold">
                <Skeleton variant="text" width={80} height={20} />
              </TableHead>
              <TableHead className="hidden md:table-cell font-bold">
                <Skeleton variant="text" width={80} height={20} />
              </TableHead>
              <TableHead className="hidden md:table-cell font-bold">
                <Skeleton variant="text" width={80} height={20} />
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Skeleton variant="text" width={150} height={20} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={100} height={20} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton variant="text" width={200} height={20} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton variant="text" width={100} height={20} />
                </TableCell>
                <TableCell className="flex">
                  <Skeleton variant="rounded" width={80} height={30} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </form>
      <Skeleton variant="rounded" width={120} height={40} className="mt-4" />
    </>
  );
};

export default function loading() {
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <Skeleton variant="text" width={120} height={30} />
        <Button variant="outline">
          <Link
            href="/users/new"
            className="flex gap-3 items-center justify-center transition-opacity duration-300 hover:opacity-75"
          >
            <UserPlusIcon />
            Add User
          </Link>
        </Button>
      </div>
      <div className="w-full mb-4"></div>
      <SkeletonUsersTable />
    </main>
  );
}
