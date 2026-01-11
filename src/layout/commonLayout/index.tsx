import Footer from "@/components/Footer";
import MainHeader from "@/components/Header";
import FloatingNav from "@/components/FloatingNav";
import CookiePopup from "@/components/CookiePopup";
import React, { ReactNode } from "react";

interface CommonLayoutProps {
  children: ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <main className="MainWrap">
      <MainHeader />
      {/* <PageTransition duration="0.8s" easing="cubic-bezier(0.25, 0.1, 0.25, 1)"> */}
      {children}
      {/* </PageTransition> */}
      <Footer />
      <FloatingNav />
      <CookiePopup />
    </main>
  );
};

export default CommonLayout;

