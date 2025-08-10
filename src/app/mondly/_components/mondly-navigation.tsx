"use client";
import * as React from "react";
import { Menu } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const linkItems = [
  { href: "/", label: "Home" },
  { href: "/etc/ai", label: "AI" },
  { href: "/etc/course-book", label: "Course Book" },
  { href: "/etc/alphabets", label: "Alphabets" },
  { href: "/etc/grammar", label: "Grammar" },
  { href: "/etc/urdu-script-book", label: "Urdu Script Book" },
  { href: "/etc/vocabulary", label: "Vocabulary" },
];
export default function MondlyNavigation() {
  const pathname = usePathname();
  const [selectedLink, setSelectedLink] = React.useState<string>(pathname);
  const selectedStyle =
    "bg-blue-700 text-white border border-blue-700 rounded-md";
  const hoverStyle =
    "hover:bg-gray-500 hover:text-white hover:border-gray-200 hover:rounded-md";
  return (
    <header>
      <nav className="bg-gray-800">
        <div className="w-full flex flex-row flex-wrap  md:text-[2rem]">
          {linkItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-white ml-2 px-2 border rounded-xl  ${hoverStyle} ${
                selectedLink === item.href ? selectedStyle : ""
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
