"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

const mainNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "Mondly",
    href: "/mondly",
    items: [
      { title: "Start", href: "/mondly" },
      { title: "Categories", href: "/mondly/categories" },
      { title: "Lessons", href: "/mondly/lessons" },
    ],
  },
  {
    title: "ETC",
    href: "/etc",
    items: [
      { title: "Start", href: "/etc" },
      { title: "AI", href: "/etc/ai" },
      { title: "Course Book", href: "/etc/course-book" },
      { title: "Alphabets", href: "/etc/alphabets" },
      { title: "Grammar", href: "/etc/grammar" },
      { title: "Urdu Script Book", href: "/etc/urdu-script-book" },
      { title: "Vocabulary", href: "/etc/vocabulary" },
    ],
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Your App Name</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {mainNavItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-3 p-4">
                          {item.items.map((subItem) => (
                            <li key={subItem.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full justify-start",
                                    pathname === subItem.href &&
                                      "bg-accent text-accent-foreground"
                                  )}
                                >
                                  {subItem.title}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname === item.href &&
                            "bg-accent text-accent-foreground"
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="flex h-9 w-9 items-center justify-center md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 pt-6">
              {mainNavItems.map((item) => (
                <div key={item.title}>
                  <Link
                    href={item.href}
                    legacyBehavior
                    passHref
                    className="font-bold text-lg"
                    onClick={() => item.href && setOpen(false)}
                  >
                    {item.title}
                  </Link>
                  {item.items && (
                    <ul className="mt-2 ml-4 space-y-2">
                      {item.items.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.href}
                            legacyBehavior
                            passHref
                            className={cn(
                              "text-muted-foreground hover:text-foreground",
                              pathname === subItem.href && "text-primary"
                            )}
                            onClick={() => setOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        {/* Additional header items can go here, e.g., a user profile dropdown */}
      </div>
    </header>
  );
}
