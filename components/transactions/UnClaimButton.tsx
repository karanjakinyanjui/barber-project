"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import unclaim from "@/public/unclaim.png";
import Image from "next/image";
import { Transaction } from "@prisma/client";
import { unClaimTransaction } from "./actions";
import toast from "react-hot-toast";

interface Props {
  transaction: Transaction;
}

export function UnClaimButton({ transaction }: Props) {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    unClaimTransaction(transaction).then(() => {
      setLoading(false);
      toast("Transaction Released");
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      className={`flex w-full bg-red-800 px-5 py-3 text-center text-xs font-bold uppercase text-white hover:text-black transition hover:bg-white ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      <Image src={unclaim} alt="Unclaim" className="mr-2 h-8 w-8" />
      {loading ? "UnClaiming..." : "UnClaim"}
    </Button>
  );
}
