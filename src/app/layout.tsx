import GlobalProviders from "@/components/GlobalProviders";
import ScrollToTop from "@/components/ScrollToTop";
import CommonLayout from "@/layout/commonLayout";
import "@/styles/main.scss";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "App",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <GlobalProviders>
          <CommonLayout>{children}</CommonLayout>
          <ScrollToTop />
        </GlobalProviders>
      </body>
    </html>
  );
}

