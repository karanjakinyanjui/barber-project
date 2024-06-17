"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import claim from "@/public/claim.png";
import Image from "next/image";
import { Transaction } from "@prisma/client";
import { claimTransaction } from "./claimAction";
import toast from "react-hot-toast";

interface Props {
  transaction: Transaction;
}

export function ClaimButton({ transaction }: Props) {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    claimTransaction(transaction).then(() => {
      setLoading(false);
      toast("Transaction Claimed");
    });
  };
  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      className={`flex w-full bg-primary px-5 py-3 text-center border border-current text-xs font-bold uppercase text-gray-900 transition hover:bg-white ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      <Image src={claim} alt="Claim" className="mr-2 h-8 w-8 rounded-lg" />
      {loading ? "Claiming..." : "Claim"}
    </Button>
  );
}
