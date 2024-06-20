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
import Image from "next/image";

export default async function User() {
  const user = await getUser();

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image!} />
          <AvatarFallback>
            <Image
              src="/avatar.svg"
              alt=" placeholder"
              width={80}
              height={80}
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 my-4">
        <DropdownMenuItem>
          <Link href="/profile" className="w-full">
            <span>My Profile </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="/transactions" className="w-full">
            <span>My Transactions </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/users" className="w-full">
            <span>Team</span>
          </Link>
        </DropdownMenuItem>
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
