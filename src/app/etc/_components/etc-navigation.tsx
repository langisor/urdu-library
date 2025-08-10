"use client";
import * as React from "react";
import { Menu } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const linkItems = [
  { href: "/etc", label: "Start" },
  { href: "/etc/ai", label: "AI" },
  { href: "/etc/course-book", label: "Course Book" },
  { href: "/etc/alphabets", label: "Alphabets" },
  { href: "/etc/grammar", label: "Grammar" },
  { href: "/etc/urdu-script-book", label: "Urdu Script Book" },
  { href: "/etc/vocabulary", label: "Vocabulary" },
];
export default function EtcNavigation() {
  const pathname = usePathname();
  React.useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  const handlePath = (path: string) => {
    const pathArray = pathname.split("/");
    return pathArray.includes(path); 

  };

  const selectedStyle =
    "bg-blue-700 text-white border border-blue-700 rounded-md";
  const hoverStyle =
    "hover:bg-gray-500 hover:text-white hover:border-gray-200 hover:rounded-md";
  return (
    <header className="p-1">
      <nav className="bg-primary py-[1rem]">
        <div className="w-full flex flex-row flex-wrap ">
          {linkItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-white border rounded-xl  ${hoverStyle} ${
                handlePath(item.href) ? selectedStyle : ""
              }`}
              legacyBehavior>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
