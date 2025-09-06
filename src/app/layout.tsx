import "./globals.css";
import { Metadata } from "next";
import MainSiteNavigation from "@/app/_components/navigation/main-site-navigation";
import { SWRConfig } from "swr";
import { getUser } from "@/server/actions/getUser";
import { Noto_Naskh_Arabic, Noto_Nastaliq_Urdu, Inter } from "next/font/google";
// fonts
const NaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-naskh-arabic",
  weight: "variable",
});
const NastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-nastaliq",
  weight: "variable",
});
const InterFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "variable",
});

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
      lang="en"
      className={`${InterFont.variable} ${NaskhArabic.variable} ${NastaliqUrdu.variable}`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Urdu Lib" />
      </head>
      <body>
        <MainSiteNavigation />
         <main className="flex min-h-screen flex-col    bg-gradient-to-b from-[#2e026d] to-[#2229ad] text-white">
          <SWRConfig
            value={{
              fallback: {
                // We do NOT await getUser() here
                // Only components that read this data will suspend
                // see https://nextjs.org/docs/app/guides/single-page-applications
                "/api/user": getUser(),
              },
            }}
          >
            {children}
          </SWRConfig>
        </main>
      </body>
    </html>
  );
}
