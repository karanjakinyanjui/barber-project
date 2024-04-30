"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import claim from "@/public/claim.png";
import Image from "next/image";
import { updateTransaction } from "@/api";

interface Props {
  transID: string;
}

export function ClaimButton({ transID }: Props) {
  const handleClaim = () => {
    const userId = parseInt(localStorage.getItem("app_user_id") || "");
    updateTransaction(transID, { userId });
  };

  return (
    <Button
      onClick={handleClaim}
      variant="secondary"
      className="flex w-full bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-900"
    >
      <Image src={claim} alt="Claim" className="mr-2 h-8 w-8" />
      Claim
    </Button>
  );
}
