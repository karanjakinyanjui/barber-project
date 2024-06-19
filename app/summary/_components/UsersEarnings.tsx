"use client";
import prisma from "@/prisma/client";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export default async function UsersEarnings() {
  const transactions = await prisma.transaction.findMany({
    include: {
      User: true,
    },
  });
  console.log(transactions);

  return (
    <div>
      {transactions.map((transaction) => (
        <div>
          <p>{transaction?.BillRefNumber}</p>
          <p>{transaction?.TransAmount}</p>
          <p>{transaction?.User?.name}</p>
        </div>
      ))}
    </div>
  );
}
