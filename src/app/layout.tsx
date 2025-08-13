import "./globals.css";
import { Metadata } from "next";
import MainSiteNavigation from "@/app/_components/navigation/main-site-navigation";
 
 

export const metadata: Metadata = {
  title: "Beginning Urdu",
  description: "A website for learning Urdu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainSiteNavigation />
        <main className="p-[1rem] pt-[2rem]">{children}</main>
      </body>
    </html>
  );
}
