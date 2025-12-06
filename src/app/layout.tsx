import "./globals.css";
import { Metadata } from "next";
import MainSiteNavigation from "@/app/_components/navigation/main-site-navigation";
import { inter, naskh, nastaliq } from "@/assets/fonts";

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
    <html
      lang="ar"
      className={`${inter.variable} ${naskh.variable} ${nastaliq.variable}`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Urdu Lib" />
      </head>
      <body className={inter.className}>
        <MainSiteNavigation />
        <main className="flex min-h-screen flex-col    bg-gradient-to-b from-[#8b580b] to-[#292d81] ">
          {children}
        </main>
      </body>
    </html>
  );
}
