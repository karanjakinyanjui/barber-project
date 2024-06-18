import { PageItems } from "@/constants/constants";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { getAdmin } from "@/auth";

export default async function NavLinks() {
  const admin = await getAdmin();
  return (
    <nav className="md:block hidden">
      <div className="flex justify-center space-x-4">
        {PageItems.map(
          (item) =>
            (!item.admin || admin) && (
              <Link href={item.link} key={item.name}>
                <Button
                  variant="outline"
                  className="w-full border border-primary bg-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white hover:bg-blue-500 dark:hover:bg-blue-600 focus:bg-blue-700 dark:focus:bg-blue-800 rounded-lg transition-colors duration-300"
                >
                  {item.name}
                </Button>
              </Link>
            )
        )}
      </div>
    </nav>
  );
}
