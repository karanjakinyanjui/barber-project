import React from "react";
import Image from "next/image";
import { getDBUser, signOut } from "@/auth";
import phone from "@/public/phone.png";
import name from "@/public/name.png";
import email from "@/public/email.png";
import calendar from "@/public/calendar.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StaticImageData } from "next/image";
import LoaderAnimation from "@/components/ui/LoaderAnimation";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: string;
  createdAt: string;
}

interface CardLinkProps {
  imageSrc: StaticImageData;
  title: string;
  data: string;
}

const CardLink: React.FC<CardLinkProps> = ({ imageSrc, title, data }) => (
  <div className="block dark:bg-transparent rounded-xl border border-white dark:border-gray-800 p-3 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 hover:bg-pink-500/10">
    <span className="rounded-lg p-1">
      <Image src={imageSrc} alt={title} width={30} height={30} />
    </span>

    <h2 className="mt-1 text-xl font-bold text-white">{title}</h2>

    <p className="mt-1 text-sm text-gray-300">
      <span className="flex items-center">
        <span className="h-px flex-1 bg-black dark:bg-primary"></span>
        <span className="shrink-0 px-6"> {data || "N/A"}</span>
        <span className="h-px flex-1 bg-black dark:bg-primary"></span>
      </span>
    </p>
  </div>
);

const UserProfile: React.FC = async () => {
  const user = await getDBUser();

  return (
    <section className="text-white">
      <div className="max-w-screen-xl px-4 py-4 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex justify-between w-full">
          <h2 className="text-3xl font-bold sm:text-4xl">My Profile</h2>
          <Button className="mt-2 cursor-pointer" variant="default">
            <Link href="/transactions">My Transactions</Link>
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardLink imageSrc={name} title="Name" data={user?.name || "N/A"} />
          <CardLink
            imageSrc={email}
            title="Email"
            data={user?.email || "N/A"}
          />
          <CardLink
            imageSrc={phone}
            title="Phone"
            data={user?.phone || "N/A"}
          />
          <CardLink
            imageSrc={calendar}
            title="Member Since"
            data={new Date(user?.createdAt!).toLocaleDateString()}
          />
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
