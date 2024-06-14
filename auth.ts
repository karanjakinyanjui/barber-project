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

export const getAdmin = async () => {
  const user = await getUser();
  if (!user) return null;

  const admin = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (admin?.role !== "EMPLOYEE") return admin;
};
getAdmin;
