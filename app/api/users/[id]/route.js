import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { id } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return new Response(JSON.stringify(user), {
    status: 200,
  });
}
