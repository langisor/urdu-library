import "./globals.css";
import { Metadata } from "next";
import MainSiteNavigation from "@/app/_components/navigation/main-site-navigation";

export const metadata: Metadata = {
  title: "Urdu Library",
  description: "A website for learning Urdu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Urdu Lib" />
      </head>
      <body>
        <MainSiteNavigation />
        <main className="flex min-h-screen flex-col    bg-gradient-to-b from-[#2e026d] to-[#2229ad] text-white">
          {children}
        </main>
      </body>
    </html>
  );
}
