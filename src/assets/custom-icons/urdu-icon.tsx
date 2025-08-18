"use client";
import * as React from "react";
import UrduIconImage from "@/assets/custom-icons/urdu-icon.png";
import Image from "next/image";
interface IconProps {
  size?: number;

  className?: string;
}

export const UrduIcon: React.FC<IconProps> = ({
  size = 32,

  className = "",
}) => {
  // Ensure the size is a number
  if (typeof size !== "number") {
    console.warn("Size should be a number. Defaulting to 32.");
    size = 32;
  }

  return (
    <Image
      src={UrduIconImage}
      alt="Urdu Icon"
      width={size}
      height={size}
      className={`inline-block ${className} cursor-pointer transition-transform hover:scale-110 rounded-xl object-cover bg-green-600`}
    />
  );
};
