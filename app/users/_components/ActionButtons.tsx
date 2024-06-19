"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { deleteUser } from "./userAction";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";

const ActionButtons = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState("");
  const handleClick = (e: any) => {
    e.preventDefault();
    setLoading(id);
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
    } else {
      setLoading("");
    }
  };

  return (
    <>
      <Button
        disabled={loading === id}
        className="w-full cursor-pointer"
        size="sm"
        variant="ghost"
      >
        <Link
          href={`/users/${id}/edit`}
          className="transition-opacity duration-300 hover:opacity-75"
        >
          <PencilIcon size="16" />
        </Link>
      </Button>
      <Button
        className="w-full cursor-pointer"
        size="sm"
        variant="ghost"
        onClick={handleClick}
      >
        {loading === id ? <Spinner /> : <TrashIcon color="red" size="16" />}
      </Button>
    </>
  );
};

export default ActionButtons;
