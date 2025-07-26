import "./globals.css";
import { Inter, Noto_Nastaliq_Urdu, Noto_Sans_Arabic } from "next/font/google";
import MainNavigation from "@/components/main-navigation";
// Define the fonts with appropriate subsets for performance
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-sans-arabic",
});
const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-noto-nastaliq-urdu",
}); // Nastaliq also uses the 'arabic' subset

export const metadata = {
  title: "Multi-Language App",
  description: "Next.js app with English, Urdu, and Arabic.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* className={${inter.variable} ${notoSansArabic.variable} 
      ${notoNastaliqUrdu.variable}}: This applies the CSS variables
       to the body element. This makes them globally available. */}
      <body
        className={`${inter.variable} ${notoSansArabic.variable} ${notoNastaliqUrdu.variable}`}
      >
        <div className="flex flex-col min-h-screen">
          <MainNavigation />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
