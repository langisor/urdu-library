import { useState, useEffect, useRef } from "react";

export const useNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  // Improved click-outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the menu container
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Also check if the click is not on the toggle button itself
        const toggleButton = document.querySelector(
          '[aria-label="Toggle navigation menu"]'
        );
        if (toggleButton && !toggleButton.contains(event.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return {
    isMobileMenuOpen,
    openSubMenu,
    menuRef,
    toggleMobileMenu,
    toggleSubMenu,
  };
};