import React from "react";
import transcimg from "@/public/transc.png";
import { ClaimButton } from "./ClaimButton";
import { Transaction } from "@prisma/client";
import { UnClaimButton } from "./UnClaimButton";

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const { TransTime, TransAmount, TransID } = transaction;
  const formattedTime = `${TransTime.substring(0, 4)}-${TransTime.substring(
    4,
    6
  )}-${TransTime.substring(6, 8)} ${TransTime.substring(
    8,
    10
  )}:${TransTime.substring(10, 12)}:${TransTime.substring(12, 14)}`;

  return (
    <div className="mx-auto my-2 max-w-sm w-full">
      <article className="flex dark:bg-black border border-black dark:border-gray-200 bg-white transition hover:shadow-xl rounded">
        <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
          <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase dark:text-white text-gray-900">
            <span>{formattedTime}</span>
          </time>
        </div>

        <div
          className="flex flex-1 flex-col justify-between bg-cover bg-no-repeat p-4"
          style={{
            backgroundImage: `url(${transcimg})`,
          }}
        >
          <div className="border-s dark:border-blue-500/50 border-gray-900/10 p-4">
            <div className="flex flex-row justify-end">
              <h3 className="font-bold uppercase text-gray-900">
                <div className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                  <div className="flex items-center">
                    <span className="text-xs font-bold text-gray-900 mr-1">
                      KES
                    </span>
                    <h6>{TransAmount}</h6>
                  </div>
                </div>
              </h3>
            </div>
            <h3 className="font-bold uppercase flex justify-center items-center dark:text-white text-gray-900 mt-2">
              {TransID}
            </h3>
          </div>

          <div className="flex items-end justify-end">
            {transaction.userId ? (
              <UnClaimButton transaction={transaction} />
            ) : (
              <ClaimButton transaction={transaction} />
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
