export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "@prisma/client";
import { processTransaction } from "@/lib/helpers";

const prisma = new PrismaClient();

// Get all tx
export async function GET(req) {
  let tx = await prisma.transaction.findMany({
    orderBy: {
      TransactionTime: "desc",
    },
    include: {
      User: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  tx = tx.map((t) => ({
    ...t,
    user: t.User?.name,
    time: t.TransactionTime.toTimeString().slice(0, 5),
  }));
  return new Response(JSON.stringify(tx, null, 2));
}

export async function POST(req) {
  let tx = await req.json();
  tx = processTransaction(tx);

  await prisma.transaction.create({
    data: tx,
  });

  return new Response(
    JSON.stringify({
      ResultCode: 0,
      ResultDesc: "Success",
    })
  );
}

export async function PATCH(req) {
  const tx = await req.json();

  await prisma.transaction.update({
    where: { id: tx.id },
    data: tx,
  });

  return new Response(
    JSON.stringify(
      {
        message: "Transaction updated successfully",
      },
      null,
      2
    )
  );
}
