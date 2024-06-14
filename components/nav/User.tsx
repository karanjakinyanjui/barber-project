import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function User() {
  const user = await getUser();

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image!} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 my-4">
        <DropdownMenuLabel>
          <Link href="/profile">
            <span>My Profile </span>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="/transactions">
            <span>My Transactions </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";
              signOut();
              redirect("/login");
            }}
          >
            <Button variant="ghost">Log out</Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button>
      <Link href="/login">Log in</Link>
    </Button>
  );
}
