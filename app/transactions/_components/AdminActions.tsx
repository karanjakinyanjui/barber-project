import claim from "@/public/claim.png";
import Image from "next/image";
import React from "react";

const AdminActions = () => {
  return <Image src={claim} alt="Claim" className="mr-2 h-8 w-8 rounded-lg" />;
};

export default AdminActions;
