import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCardLink = () => (
  <div className="block dark:bg-transparent rounded-xl border border-white dark:border-gray-800 p-3 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 hover:bg-pink-500/10">
    <span className="rounded-lg p-1">
      <Skeleton className="h-6 w-6" />
    </span>
    <Skeleton className="mt-1 h-6 w-24" />
    <div className="mt-1">
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

export default function loading() {
  return (
    <section className="text-white">
      <div className="max-w-screen-xl px-4 py-4 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex justify-between w-full">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SkeletonCardLink />
          <SkeletonCardLink />
          <SkeletonCardLink />
          <SkeletonCardLink />
        </div>
      </div>
    </section>
  );
}
