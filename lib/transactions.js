import prisma from "@/prisma/client";

export async function getTransactions(
  { claimed, start, end, dateStr, userName },
  isAdmin
) {
  let where = {};
  if (userName) {
    where = {
      User: {
        name: {
          contains: userName,
          mode: "insensitive",
        },
      },
    };
  }
  if (!isAdmin) {
    where = {
      userId: null,
    };
  }

  const q = {
    where: where,
    orderBy: {
      TransactionTime: "desc",
    },
    include: {
      User: true,
    },
  };
  if (claimed) {
    if (claimed) {
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
        lte: new Date(end || ""),
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
  return await prisma.transaction.findMany(q);
}
