import React from "react";
import { ToggleTheme } from "./ToggleTheme";
import User from "./User";
import NavLinks from "./NavLinks";
import Sidebar from "./Sidebar";
import Logo1 from "../ui/Logos";

export default function NavBar() {
  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between align-middle text-white py-4 px-2 bg-gray-800 items-center">
        <div className="mx-1 flex gap-3 justify-center items-center">
          <Sidebar />
          <Logo1 />
        </div>
        <div className="">
          <NavLinks />
        </div>
        <div className="flex gap-3 mr-2 justify-center items-center">
          <ToggleTheme />
          <User />
        </div>
      </nav>
    </>
  );
}
