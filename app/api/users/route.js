export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all users
export async function GET(req) {
  const users = await prisma.user.findMany({});

  return Response.json(users);
}
