export const dynamic = "force-dynamic"; // defaults to auto
import { isAdmin } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all users
export async function GET(req) {
  if (!isAdmin(req)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      phone: true,
      name: true,
      role: true,
      transactions: true,
    },
  });

  return new Response(JSON.stringify(users), {
    status: 200,
  });
}
