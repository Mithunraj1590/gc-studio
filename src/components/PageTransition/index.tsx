"use client";
import React, { useLayoutEffect, useState, ReactNode } from "react";
import Style from "./PageTransition.module.scss";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
  duration?: string;
  easing?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, duration, easing }) => {
  const [isTransitionActive, setIsTransitionActive] = useState<boolean>(false);
  const pathname = usePathname();
  
  useLayoutEffect(() => {
    setIsTransitionActive(true);
  }, [pathname]);

  return (
    <div
      className={`${Style.page_transition ?? "page-transition"} ${
        isTransitionActive ? "transition-active" : ""
      }`}
      style={{ "--pt-duration": duration, "--pt-easing": easing } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default PageTransition;

