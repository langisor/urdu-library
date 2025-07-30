"use client";
import * as React from "react";
import { Menu } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const linkItems = [
  { href: "/", label: "Home" },
  { href: "/course-book", label: "Course Book" },
  { href: "/alphabets", label: "Alphabets" },
  { href: "/urdu-script-book", label: "Urdu Script Book" },
  {href: "/urdu-100-vocabularies", label: "Urdu 100 Phrases" },
];
export default function MainNavigation() {
  const pathname = usePathname();

  const selectedStyle =
    "bg-blue-700 text-white border border-blue-700 rounded-md";
  const hoverStyle =
    "hover:bg-gray-500 hover:text-white hover:border-gray-200 hover:rounded-md";
  return (
    <header className="flex justify-between items-center p-4">
      <nav className="flex space-x-4">
        {linkItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-2 ${hoverStyle} ${
              pathname === item.href ? selectedStyle : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
