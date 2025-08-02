import { Inter } from "next/font/google";
import { Noto_Naskh_Arabic } from "next/font/google";
import { Noto_Nastaliq_Urdu } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
export const noto_naskh_arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-naskh-arabic",
  display: "swap",
});
export const noto_nastaliq_urdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-nastaliq",
  display: "swap",
});
