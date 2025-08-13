import "./globals.css";
import { Metadata } from "next";
import MainSiteNavigation from "@/app/_components/navigation/main-site-navigation";
import { SWRConfig } from "swr";
import { getUser } from "@/server/actions/getUser";
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
 
      <body>
        <MainSiteNavigation />
        <main className="p-[1rem] pt-[2rem]">
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
