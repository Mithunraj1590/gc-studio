"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from 'next/navigation';
import Style from "./Header.module.scss";
import Logo from "./Logo";
import SearchIcon from "./SearchIcon";
import TimeDisplay from "./TimeDisplay";
import Icons from "@/styles/Icons";
import { gsap } from 'gsap';

const MainHeader: React.FC = () => {
  const pathname = usePathname();
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Check if current page is a blog detail page or work detail page
  const isBlogDetailPage = pathname?.startsWith('/blog/') || false;
  const isWorkDetailPage = pathname?.startsWith('/works/') || false;

  useEffect(() => {
    // Animate header on mount
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    // For blog detail pages or work detail pages, always show background at top
    if (isBlogDetailPage || isWorkDetailPage) {
      setIsScrolled(true);
      return;
    }

    // Handle scroll to add/remove background (after 2-3 scrolls ~200px)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 200);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, isBlogDetailPage, isWorkDetailPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
      }
    };

    if (isSearchExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      searchInputRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchExpanded]);

  return (
    <header 
      ref={headerRef} 
      className={`${Style.MainHeader} ${isScrolled ? Style.scrolled : ''}`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-6">
          <div className={Style.LeftSection}>
            <Logo />
          </div>
          <div className={`${Style.RightSection} flex items-center gap-4`}>
            <div ref={searchContainerRef} className="relative flex items-center">
              {!isSearchExpanded && (
                <SearchIcon onToggle={() => setIsSearchExpanded(!isSearchExpanded)} />
              )}
              <div
                className={`absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out overflow-hidden ${
                  isSearchExpanded
                    ? "w-[300px] sm:w-[400px] opacity-100"
                    : "w-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="relative w-full">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 pr-10 bg-white text-gray-900 rounded-lg focus:outline-none"
                  />
                  <button
                    onClick={() => setIsSearchExpanded(false)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors p-1"
                    aria-label="Close search"
                  >
                    <Icons icon="icon-search" size={20} />
                  </button>
                </div>
              </div>
            </div>
            <TimeDisplay />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;

