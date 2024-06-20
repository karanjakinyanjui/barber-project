import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function SkeletonTransactionCard() {
  return (
    <div className="mx-auto my-2 max-w-sm w-full">
      <article className="flex dark:bg-black border border-black dark:border-gray-200 bg-white transition hover:shadow-xl rounded">
        <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="flex flex-1 flex-col justify-between bg-cover bg-no-repeat p-4">
          <div className="flex flex-row self-start max-w-fit justify-start ml-2 border-b border-gray-500 dark:border-zinc-50">
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="border-s dark:border-blue-500/50 border-gray-900/10 p-4">
            <div className="flex flex-row justify-end">
              <div className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-8 mr-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
            <Skeleton className="h-6 w-32 mt-2" />
          </div>
          <div className="flex items-end justify-end p-1">
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </article>
    </div>
  );
}

export default function loading() {
  return (
    <div className="p-4 ">
      <div className="mb-5 flex justify-center items-center">
        <h2 className="text-center justify-center text-2xl font-bold md:mb-6 lg:text-3xl">
          <Skeleton className="h-10 w-32 mt-2" />
        </h2>
      </div>
      <div className="my-4 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-12 md:space-y-0">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonTransactionCard key={index} />
        ))}
      </div>
    </div>
  );
}
