import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AdminActions from "./AdminActions";
import UserActions from "./UserActions";

import React from "react";
import { EllipsisVertical } from "lucide-react";
import { Transaction } from "@prisma/client";

interface Props {
  transaction: Transaction;
  admin: boolean;
}

const Actions = ({ admin, transaction }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {admin ? <AdminActions /> : <UserActions transaction={transaction} />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
