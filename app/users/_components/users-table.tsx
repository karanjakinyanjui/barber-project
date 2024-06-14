import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { PencilIcon, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import ActionButtons from "./ActionButtons";

export function UsersTable({
  users,
  offset,
}: {
  users: User[];
  offset: number | null;
}) {
  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button className="mt-4 w-40" variant="secondary">
          <Link href={`/?offset=${offset}`}>Next Page</Link>
        </Button>
      )}
    </>
  );
}

function UserRow({ user }: { user: User }) {
  const deleteUserWithId = async () => {
    "use server";
    toast("Deleting " + user.name);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell className="hidden md:table-cell">{user.role}</TableCell>
      <TableCell className="flex">
        <ActionButtons id={user.id} />
      </TableCell>
    </TableRow>
  );
}
