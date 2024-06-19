"use server";
import { redirect } from "next/navigation";

export const doSearch = async (url: string) => {
  redirect(url);
};
