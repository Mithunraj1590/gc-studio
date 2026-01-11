"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: string;
  label: string;
  description: string;
}

interface ImpactStatsProps {
  data?: {
    label?: string;
    title?: string;
    stats?: StatItem[];
  };
}

const ImpactStats: React.FC<ImpactStatsProps> = ({ data }) => {
  const pathname = usePathname();
  const label = data?.label || "Impact";
  const title = data?.title || "Elevating Brands With Measurable Impact";
  const stats = data?.stats || [];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Set initial states
    if (headerRef.current) {
      gsap.set(headerRef.current.children, { opacity: 0, y: 30 });
    }
    if (statsRef.current) {
      gsap.set(statsRef.current.children, { opacity: 0, y: 50 });
    }

    // Animate header
    if (headerRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(headerRef.current!.children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(trigger);
    }

    // Animate stats
    if (statsRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(statsRef.current!.children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(trigger);
    }

    // Refresh ScrollTrigger after animations are set up
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      triggers.forEach(trigger => trigger.kill());
    };
  }, [pathname]);

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 lg:py-[100px]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 md:mb-20">
          {/* Label with vertical lines */}
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
            <span className="text-xs sm:text-sm text-black font-medium">{label}</span>
            <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
          </div>

          {/* Main Title */}
          <h2 className="h2 font-semibold text-black max-w-4xl mx-auto leading-tight">
            {title}
          </h2>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-left">
              {/* Stat Value */}
              <div className="text-[30px] font-bold text-black mb-3 sm:mb-4">
                {stat.value}
              </div>

              {/* Stat Label */}
              <div className="text-md font-semibold text-black mb-3 sm:mb-4">
                {stat.label}
              </div>

              {/* Stat Description */}
              <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;

