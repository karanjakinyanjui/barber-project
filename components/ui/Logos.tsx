import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo1() {
  return (
    <Link href="/" className="">
      <Image src="/logo.svg" alt="Google icon" width={80} height={80} />
    </Link>
  );
}
