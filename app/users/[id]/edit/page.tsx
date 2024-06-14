import React from "react";
import UserForm from "../../_components/UserForm";
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string;
  };
}

const EditUser = async ({ params: { id } }: Props) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return (
    <div>
      <UserForm user={user!} />
    </div>
  );
};

export default EditUser;
