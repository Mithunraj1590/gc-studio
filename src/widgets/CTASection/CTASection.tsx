"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundColor?: string;
    textColor?: string;
  };
}

const CTASection: React.FC<CTASectionProps> = ({ data }) => {
  const pathname = usePathname();
  const title = data?.title || "Let's Work Together";
  const subtitle = data?.subtitle || "";
  const buttonText = data?.buttonText || "Get Started";
  const buttonLink = data?.buttonLink || "/contact";
  const backgroundColor = data?.backgroundColor || "bg-black";
  const textColor = data?.textColor || "text-white";

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Set initial states
    if (contentRef.current) {
      gsap.set(contentRef.current.children, { opacity: 0, y: 40 });
    }

    if (contentRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(contentRef.current!.children, {
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
    <section ref={sectionRef} className={`w-full ${backgroundColor} py-20 px-4`}>
      <div className="container mx-auto">
        <div ref={contentRef} className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Left Side - Title */}
          <div className="w-full md:w-1/2">
            <h2 className={`h2-5xl font-semibold ${textColor} mb-0 max-w-md`}>
              {title}
            </h2>
          </div>
          
          {/* Right Side - Paragraph and Button */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            {subtitle && (
              <p className={`text-lg md:text-xl ${textColor} opacity-80 mb-0`}>
                {subtitle}
              </p>
            )}
            <div>
              <Link
                href={buttonLink}
                className="btn btn-secondary"
              >
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

