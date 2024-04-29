
import React from "react";
import { Button } from "@/components/ui/button";
import claim from "@/public/claim.png";
import transcimg from "@/public/transc.png";
import Image from "next/image";

interface TransactionCardProps {
  transTime: string;
  transAmount: string;
  transID: string;
}

export default function TransactionCard({
  transTime,
  transAmount,
  transID,
}: TransactionCardProps) {
  const formattedTime = `${transTime.substring(0, 4)}-${transTime.substring(
    4,
    6
  )}-${transTime.substring(6, 8)} ${transTime.substring(
    8,
    10
  )}:${transTime.substring(10, 12)}:${transTime.substring(12, 14)}`;

  return (
    <div className="max-w-sm w-full">
      <article className="flex bg-white transition hover:shadow-xl rounded">
        <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
          <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
            <span>{formattedTime}</span>
          </time>
        </div>

        <div
          className="flex flex-1 flex-col justify-between bg-cover bg-no-repeat p-4"
          style={{
            backgroundImage: `url(${transcimg})`,
          }}
        >
          <div className="border-s border-gray-900/10 p-4">
            <div className="flex flex-row justify-end">
              <h3 className="font-bold uppercase text-gray-900">
                <div className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                  <div className="flex items-center">
                    <span className="text-xs font-bold text-gray-900 mr-1">
                      KES
                    </span>
                    <h6>{transAmount}</h6>
                  </div>
                </div>
              </h3>
            </div>
            <h3 className="font-bold uppercase flex justify-center items-center text-gray-900 mt-2">
              {transID}
            </h3>
          </div>

          <div className="flex items-end justify-end">
            <Button
              variant="secondary"
              className="flex w-full bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-900"
            >
              <Image src={claim} alt="Claim" className="mr-2 h-8 w-8" />
              Claim
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
