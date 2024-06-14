"use server";

import prisma from "@/prisma/client";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface UserData {
  id?: string;
  name: string;
  phone: string;
  role: Role;
  email: string;
}

export const createUser = async (user: UserData) => {
  return await prisma.user.create({
    data: user,
  });
};

export const updateUser = async (user: UserData) => {
  const { id, name, phone, role } = user;
  return await prisma.user.update({
    where: { id },
    data: {
      name,
      phone,
      role,
    },
  });
};

export const saveUser = async (user: UserData) => {
  const func = user.id ? updateUser : createUser;
  await func(user);
  redirect("/users");
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: { id },
  });
  revalidatePath("/users");
};
