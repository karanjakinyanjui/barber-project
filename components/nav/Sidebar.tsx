import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { LucideMenu } from "lucide-react";
import { Separator } from "../ui/separator";
import { PageItems } from "@/constants/constants";
import Link from "next/link";
import Logo1 from "../ui/Logos";

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden justify-center items-center">
        <LucideMenu className="text-white" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-800 dark:bg-black">
        <SheetHeader>
          <SheetTitle className="flex justify-center items-center">
            <Logo1 />
          </SheetTitle>
          <Separator />

          <div className="flex flex-col gap-3">
            {PageItems.map((item) => (
              <Link href={item.link} key={item.name} className="w-full">
                <Button
                  variant="outline"
                  className="w-full border border-primary bg-slate-600 text-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg transition-colors duration-300"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
