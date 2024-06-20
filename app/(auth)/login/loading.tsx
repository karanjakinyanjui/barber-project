import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <section>
      <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
        <div className="grid grid-cols-1">
          <div className="w-full max-w-lg mx-auto my-4 bg-white dark:bg-gray-800 shadow-xl rounded-xl">
            <div className="p-6 lg:text-center">
              <Skeleton className="h-4 w-24 mb-8" />
              <div className="mt-6 flex justify-center items-center">
                <Skeleton className="h-12 w-60 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
