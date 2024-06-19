import React from "react";
import TotalEarnings from "./_components/TotalEarnings";
import UsersEarnings from "./_components/UsersEarnings";

export default function Summary() {
  return (
    <div className="m-1 md:m-5">
      <div className="mb-5">
        <h2 className="text-center text-2xl font-bold text-white md:mb-6 lg:text-3xl">
          Summary
        </h2>
        <TotalEarnings />
        <UsersEarnings />
      </div>
    </div>
  );
}
