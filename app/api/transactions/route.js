export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "@prisma/client";
import { processTransaction } from "@/lib/helpers";

const prisma = new PrismaClient();

// Get all tx
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams);
  let claimed = searchParams.get("claimed");
  let dateStr = searchParams.get("date");
  let start = searchParams.get("start");
  let end = searchParams.get("end");
  const q = {
    where: {},
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
  };
  if (claimed) {
    if (claimed === "true") {
      q.where = {
        NOT: [
          {
            userId: null,
          },
        ],
      };
    } else {
      q.where = {
        userId: null,
      };
    }
  }
  if (start) {
    q.where = {
      ...q.where,
      TransactionTime: {
        gte: new Date(start),
        lte: new Date(end),
      },
    };
  }

  if (dateStr) {
    let today = new Date(dateStr);
    let date = new Date(dateStr);

    let nextDate = new Date(date.setDate(date.getDate() + 1));

    q.where = {
      ...q.where,
      TransactionTime: {
        gte: today,
        lt: nextDate,
      },
    };
  }
  let tx = await prisma.transaction.findMany(q);
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
