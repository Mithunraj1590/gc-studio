"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  image: string;
  year: string;
  title: string;
  tags: string[];
  link?: string;
}

interface HomeProjectProps {
  data?: {
    label?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    projects?: Project[];
  };
}



const HomeProject: React.FC<HomeProjectProps> = ({ data }) => {
  const pathname = usePathname();
  const label = data?.label || "";
  const title = data?.title || "";
  const description = data?.description || "";
  const buttonText = data?.buttonText || "";
  const buttonLink = data?.buttonLink || "/projects";
  const projects = data?.projects || [];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Set initial states
    if (headerRef.current) {
      gsap.set(headerRef.current.children, { opacity: 0, y: 30 });
    }
    if (dividerRef.current) {
      gsap.set(dividerRef.current, { scaleX: 0 });
    }
    if (gridRef.current) {
      gsap.set(gridRef.current.children, { opacity: 0, y: 50 });
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
            stagger: 0.2,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(trigger);
    }

    // Animate divider
    if (dividerRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: dividerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(dividerRef.current!, {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(trigger);
    }

    // Animate project cards
    if (gridRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          const cards = gridRef.current!.children;
          gsap.to(cards, {
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
      <div className="container mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="flex flex-col md:flex-row items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
          <div className="w-full md:w-2/3">
            {label && (
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
                <span className="text-xs sm:text-sm text-black font-medium">{label}</span>
                <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
              </div>
            )}
            {title && (
              <h2 className="h2 font-semibold text-black mb-3 sm:mb-4 leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
                {description}
              </p>
            )}
          </div>
          
          {buttonText && (
            <div className="w-full md:w-1/3 flex justify-start md:justify-end">
              <Link
                href={buttonLink}
                className="btn btn-primary"
              >
                {buttonText}
              </Link>
            </div>
          )}
        </div>

        {/* Divider */}
        <div ref={dividerRef} className="w-full h-px bg-gray-300 mb-8 sm:mb-10 md:mb-12"></div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 sm:gap-y-[60px]">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <p className="text-lg sm:text-xl text-gray-500">No projects available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeProject;

