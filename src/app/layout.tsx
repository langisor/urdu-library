import "./globals.css";
import { Metadata } from "next";
import HomeNavigation from "@/app/_components/home-navigation";
import { Inter, Noto_Nastaliq_Urdu, Noto_Naskh_Arabic } from "next/font/google";
import { cn } from "@/lib/utils";
const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jameelNooriFont = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-nastaliq",
  display: "swap",
});
const notoNaskhArabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-naskh-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Multi-Language App",
  description: "Next.js app with English, Urdu, and Arabic.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        interFont.variable,
        jameelNooriFont.variable,
        notoNaskhArabicFont.variable
      )}
    >
      <body>
        <div className="min-h-screen">
          <div className="w-full mb-4">
            <HomeNavigation />
          </div>
          <div className="w-full mt-4 flex flex-col">{children}</div>
        </div>
      </body>
    </html>
  );
}
