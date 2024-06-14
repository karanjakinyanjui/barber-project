import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export const getUser = async () => {
  const session = await auth();
  const user = session?.user;
  return user;
};
