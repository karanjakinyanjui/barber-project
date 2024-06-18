"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-primary dark:bg-gray-600 py-3.5 rounded-lg">
      <label
        className={`relative m-0 block h-7.5 w-14 rounded-full ${
          theme === "dark" ? "bg-primary" : "bg-stroke"
        }`}
      >
        <Switch
          onClick={() => {
            if (typeof setTheme === "function") {
              setTheme(theme === "light" ? "dark" : "light");
            }
          }}
          className="dur absolute bg-teal-500 top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`absolute left-[3px] top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
            theme === "dark" && "!right-[3px] !translate-x-full"
          }`}
        >
          <span className="text-black dark:hidden">
            <SunIcon />
          </span>
          <span className="hidden text-black dark:inline-block">
            <MoonIcon />
          </span>
        </span>
      </label>
    </div>
  );
}
