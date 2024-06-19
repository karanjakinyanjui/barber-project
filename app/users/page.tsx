import { getAdmin } from "@/auth";
import { UsersTable } from "./_components/users-table";
import prisma from "@/prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserPlusIcon } from "lucide-react";
import NotAllowed from "@/components/NotAllowed";

export default async function page() {
  const admin = await getAdmin();
  if (!admin) {
    return <NotAllowed />;
  }
  const users = await prisma.user.findMany();

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-semibold text-lg text-white md:text-2xl rounded-lg p-2 border border-primary-foreground">
          Users
        </h1>
        <Button variant="outline">
          <Link
            href="/users/new"
            className="flex gap-3 items-center justify-center transition-opacity duration-300 hover:opacity-75"
          >
            <UserPlusIcon />
            Add User
          </Link>
        </Button>
      </div>
      <div className="w-full mb-4"></div>
      <UsersTable users={users} offset={0} />
    </main>
  );
}
