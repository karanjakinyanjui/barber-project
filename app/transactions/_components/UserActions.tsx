import { Transaction } from "@prisma/client";
import React from "react";

interface Props {
  transaction: Transaction;
}

const UserActions = ({ transaction }: Props) => {
  return <div>UserActions</div>;
};

export default UserActions;
