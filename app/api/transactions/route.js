export const dynamic = "force-dynamic"; // defaults to auto
import { processTransaction } from "@/lib/helpers";
import { getTransactions } from "@/lib/transactions";
import prisma from "@/prisma/client";

// Get all tx
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams);
  let claimed = searchParams.get("claimed");
  let dateStr = searchParams.get("date");
  let start = searchParams.get("start");
  let end = searchParams.get("end");
  let tx = await getTransactions({ claimed, start, end, dateStr });
  tx = tx.map((t) => ({
    ...t,
    user: t.User?.name,
    time: t.TransactionTime.toTimeString().slice(0, 5),
  }));
  return Response.json(tx);
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
  const { id, userId } = await req.json();

  await prisma.transaction.update({
    where: { TransID: id },
    data: { userId },
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
