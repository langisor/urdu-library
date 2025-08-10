import "./globals.css";
import { Metadata } from "next";
import Navigation from "@/app/_components/navigation";
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
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
