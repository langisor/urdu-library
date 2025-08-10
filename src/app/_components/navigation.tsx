"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Your App Name</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList >
              {mainNavItems.map((item) => (
                <NavigationMenuItem
                  key={item.title}
                  className={`
                    ${
                      pathname.startsWith(item.href.split("/")[0]) &&
                      "bg-accent text-accent-foreground"
                    }
                  `}
                >
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger
                        className={`${
                          pathname.startsWith(item.href.split("/")[0]) &&
                          "bg-accent text-accent-foreground"
                        }`}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid   gap-3 p-2 list-none">
                          {item.items.map((subItem) => (
                            <li key={subItem.title}>
                              <NavigationMenuLink
                              className={
                                `${
                                  pathname.startsWith(subItem.href.split("/")[0]) &&
                                  "bg-slate-500 text-white"
                                }`
                              }
                                onClick={() => setOpen(false)}
                                href={subItem.href}
                              >
                                <span
                                  className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full justify-start",
                                    pathname === subItem.href &&
                                      "bg-accent text-accent-foreground"
                                  )}
                                >
                                  {subItem.title}
                                </span>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      onClick={() => setOpen(false)}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname.startsWith(item.href.split("/")[0]) &&
                          "bg-slate-500 text-white"
                      )}
                      href={item.href}
                    >
                      <span
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "w-full justify-start"
                        )}
                      >
                        {item.title}
                      </span>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="flex h-9 w-9 items-center justify-center md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="px-4  w-[300px] sm:w-[400px] py-6"
          >
            <SheetTitle className="sr-only"> Menu</SheetTitle>
            <SheetDescription className="sr-only">Menu</SheetDescription>
            <nav className="flex flex-col space-y-4 pt-6">
              {mainNavItems.map((item) => (
                <div
                  key={item.title}
                  className={`
                    ${
                      pathname.startsWith(item.href.split("/")[1]) &&
                      "bg-slate-500 text-white"
                    }
                  `}
                >
                  <Link
                    href={item.href}
                    onClick={() => item.href && setOpen(false)}
                    className="font-bold text-lg"
                  >
                    {item.title}
                  </Link>
                  {item.items && (
                    <ul className="mt-2 ml-4 space-y-2">
                      {item.items.map((subItem) => (
                        <li
                          key={subItem.title}
                          className={`
                          ${
                            pathname.startsWith(subItem.href.split("/")[2]) &&
                            "bg-slate-500 text-white"
                          }
                        `}
                        >
                          <Link
                            href={subItem.href}
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
