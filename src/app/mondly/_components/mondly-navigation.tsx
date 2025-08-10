"use client";
import * as React from "react";
import { Menu } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const linkItems = [
  { href: "/mondly", label: "Start" },
  { href: "/mondly/categories", label: "Categories" },
  { href: "/mondly/lessons", label: "Lessons" },
];
export default function MondlyNavigation() {
  const pathname = usePathname();
   const handlePath=(path:string)=>{
    const pathArray = pathname.split("/");
    return pathArray.includes(path);
  }

  const selectedStyle =
    "bg-blue-700 text-white border border-blue-700 rounded-md";
  const hoverStyle =
    "hover:bg-gray-500 hover:text-white hover:border-gray-600 hover:rounded-md";
  return (
    <header className="p-1">
      <nav className="bg-primary py-[1rem]">
        <div className="w-full flex flex-row flex-wrap gap-2">
          {linkItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-white    border rounded-xl  ${hoverStyle} ${
                handlePath(item.href) ? selectedStyle : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
