"use client";

import { getUsers } from "@/api";
import { useEffect, useState } from "react";
import { UsersTable } from "../users-table";

export default function page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
      </div>
      <div className="w-full mb-4"></div>
      <UsersTable users={users} offset={0} />
    </main>
  );
}