import Image from "next/image";
import React from "react";

export default function Logo1() {
  return (
    <div className="">
      <Image src="/logo.svg" alt="Google icon" width={80} height={80} />
    </div>
  );
}
