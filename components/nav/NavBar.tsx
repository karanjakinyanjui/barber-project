import React from "react";
import { ToggleTheme } from "./ToggleTheme";
import User from "./User";
import NavLinks from "./NavLinks";

export default function NavBar() {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between align-middle text-white py-4 px-2 bg-gray-800 items-center">
        <div className="mx-1">Logo</div>
        <div className="">
          <NavLinks />
        </div>
        <div className="flex flex-row gap-3 mr-2">
          <div className="">
            <ToggleTheme />
          </div>
          <User />
        </div>
      </nav>
    </>
  );
}
