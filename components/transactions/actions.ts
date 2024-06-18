"use server";
import { getUser } from "@/auth";
import prisma from "@/prisma/client";
import { Transaction } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const claimTransaction = async (transaction: Transaction) => {
  const user = await getUser();
  console.log(user);

  if (!user) return null;

  // Update the transaction with the user's ID"
  const res = await prisma.transaction.update({
    where: {
      TransID: transaction.TransID,
    },
    data: {
      userId: user.id,
    },
  });
  revalidatePath("/");
};
