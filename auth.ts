import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});

export const getUser = async () => {
  const session = await auth();
  const user = session?.user;
  return user;
};

export const getDBUser = async () => {
  const user = await getUser();
  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  return dbUser;
};

export const getAdmin = async () => {
  const user = await getUser();
  if (!user) return null;

  if (user.email === "ekkinyanjui@gmail.com")
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: "ADMIN",
      },
    });

  const admin = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (admin?.role !== "EMPLOYEE") return admin;
};
getAdmin;
