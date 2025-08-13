"use client";
import * as React from "react";
import Link from "next/link";
import { useId } from "react";
import { usePathname } from "next/navigation";

// Shadcn UI components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Lucide React for icons
import { Menu } from "lucide-react";

// The navigation data from your data.ts file
// NOTE: Make sure this path is correct for your project structure
import { mainNavItems } from "./data";
import { NavItem } from "./types";


// Main header component
export default function MainHeader() {
  const pathname = usePathname();

  const menuId = useId();

  // Helper function to check if a link is active
const isActive = (pathname: string, href: string) => {
  return pathname === href;
};

// style active link
const activeLinkStyle = "text-primary font-bold bg-blue-500";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo or site title */}
          <Link href="/" className="text-xl font-bold">
            My App
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNavItems.map((item: NavItem) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      // Handle dropdown menu items
                      <>
                        <NavigationMenuTrigger className="data-[state=open]:text-primary data-[state=open]:bg-accent">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-1 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.items.map((subItem: NavItem) => (
                              <li key={subItem.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.href}
                                    className="block select-none space-y-1 rounded-md p-1 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="text-md font-medium leading-none">
                                      {subItem.title}
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      // Handle single link items
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle({
                          className: isActive(pathname, item.href)
                            ? activeLinkStyle
                            : "",
                        })}
                      >
                        <Link href={item.href}>{item.title}</Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col space-y-4">
                {mainNavItems.map((item: NavItem) => (
                  <div key={item.title}>
                    {item.items ? (
                      // Collapsible menu for mobile
                      <>
                        <p className="text-lg font-semibold">{item.title}</p>
                        <Separator className="my-2" />
                        <div className="flex flex-col space-y-2 pl-4">
                          {item.items.map((subItem: NavItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className={`text-base hover:text-primary ${
                                isActive(pathname, subItem.href)
                                  ? activeLinkStyle
                                  : ""
                              }`}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      // Single link for mobile
                      <Link
                        href={item.href}
                        className={`text-lg font-semibold hover:text-primary ${
                          isActive(pathname, item.href) ? activeLinkStyle : ""
                        }`}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
