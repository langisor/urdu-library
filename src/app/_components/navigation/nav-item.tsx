"use client";

import Link from "next/link";
import { NavItem } from './types';

interface NavItemProps {
  item: NavItem;
  onClick?: () => void;
  isActive: boolean;
}

export const NavItemComponent: React.FC<NavItemProps> = ({ 
  item, 
  onClick, 
  isActive 
}) => {
  return (
    <Link
      href={item.href}
      className={`block w-full py-2 px-4 transition-colors duration-200 ${
        isActive
          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
          : "hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
      onClick={onClick}
    >
      {item.title}
    </Link>
  );
};