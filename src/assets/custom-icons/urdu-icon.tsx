"use client";
import * as React from "react";
import UrduIconImage from "@/assets/custom-icons/urdu-icon.png";
import Image from "next/image";
interface IconProps {
   

  className?: string;
}

export const UrduIcon: React.FC<IconProps> = ({
   

  className = "",
}) => {
 
  return (
    <Image
      src={UrduIconImage}
      alt="Urdu Icon"
      width="100"
      height="100"
      className={`inline-block ${className} cursor-pointer transition-transform hover:scale-110 rounded-xl object-cover bg-green-600`}
    />
  );
};
