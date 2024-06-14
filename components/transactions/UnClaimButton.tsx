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

export function UnClaimButton({ transaction }: Props) {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    claimTransaction(transaction).then(() => {
      setLoading(false);
      toast("Transaction Released");
    });
  };
  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      className={`flex w-full bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-900 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      <Image src={claim} alt="Claim" className="mr-2 h-8 w-8" />
      {loading ? "UnClaiming..." : "UnClaim"}
    </Button>
  );
}
