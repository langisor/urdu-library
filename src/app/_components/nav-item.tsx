"use client";
import { NavItem } from "./data";
// --- Reusable NavItem Component ---
export const NavItemComponent: React.FC<{
  item: NavItem;
  onClick?: () => void;
  isActive: boolean;
}> = ({ item, onClick, isActive }) => {
  return (
    // Replace <a> with <Link> in your Next.js project
    <a
      href={item.href}
      className={`block w-full py-2 px-4 transition-colors duration-200 ${
        isActive
          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
          : "hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
      onClick={onClick}
    >
      {item.title}
    </a>
  );
};
