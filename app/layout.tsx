import "./globals.css";
import SiteLogo from "@/components/logo";
import { NotificationContextProvider } from "@/store/notification-context";
import { Barlow } from "@next/font/google";
import MainNavigation from "@/components/main-navigation";
import Footer from "@/components/footer";

const barlow = Barlow({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={`bg-gradient-to-r from-purple-500 to-pink-500 ${barlow.className}`}
      >
        <div className="pt-4">
          <header className="container mx-auto flex justify-between items-center px-4">
            <SiteLogo />
            <MainNavigation />
          </header>

          <NotificationContextProvider>
            <main>{children}</main>
          </NotificationContextProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
