"use server";
import { getAdmin, getUser } from "@/auth";
import prisma from "@/prisma/client";
import { Transaction } from "@prisma/client";
import { revalidatePath } from "next/cache";

const assign = async (
  transaction: Transaction,
  userId: string,
  assignedBy: string
) => {
  // Update the transaction with the user's ID"
  const res = await prisma.transaction.update({
    where: {
      TransID: transaction.TransID,
    },
    data: {
      userId: userId,
    },
  });
  console.log(
    transaction
    // await prisma.transaction.findFirst({
    //   where: {
    //     TransID: transaction.TransID,
    //   },
    // })
  );

  await prisma.transactionAssignment.create({
    data: {
      transactionId: transaction.id,
      userId: assignedBy,
    },
  });

  revalidatePath("/");
  return res;
};

export const claimTransaction = async (transaction: Transaction) => {
  const user = await getUser();
  if (!user?.id) return null;

  return assign(transaction, user.id, user.id);
};

export const assignTransaction = async (
  transaction: Transaction,
  userId: string
) => {
  const user = await getAdmin();

  if (!user) {
    revalidatePath("/");
    return null;
  }

  return assign(transaction, userId, user.id);
};

export const unClaimTransaction = async (transaction: Transaction) => {
  const user = await getUser();
  if (!user) return null;

  const res = await prisma.transaction.update({
    where: {
      TransID: transaction.TransID,
    },
    data: {
      userId: null,
    },
  });
  revalidatePath("/");
};
