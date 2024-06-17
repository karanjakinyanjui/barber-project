import React from "react";
import Spinner from "@/components/ui/spinner";

export default function LoaderAnimation() {
  return (
    <div className="flex justify-center items-center min-h-screen/2 ">
      <div className="p-4 bg-gray-200 rounded-lg  dark:bg-inherit">
        <iframe
          src="https://lottie.host/embed/fafb6c4c-b0aa-4d12-9838-a01cdd092e3e/Tyr9gu2d8v.json"
          width="400px"
          height="300px"
        ></iframe>
      </div>
    </div>
  );
}
