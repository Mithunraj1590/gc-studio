"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Blog {
  image: string;
  author: string;
  date: string;
  title: string;
  tags: string[];
  link?: string;
}

interface HomeBlogProps {
  data?: {
    label?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    blogs?: Blog[];
  };
}

const HomeBlog: React.FC<HomeBlogProps> = ({ data }) => {
  const pathname = usePathname();
  const label = data?.label || "Blogs";
  const title = data?.title || "Bringing Ideas To Life Through Design";
  const description = data?.description || "We collaborate with ambitious clients to create digital experiences that inspire, engage, and drive meaningful results.";
  const buttonText = data?.buttonText || "View All Blogs";
  const buttonLink = data?.buttonLink || "/blogs";
  const blogs = data?.blogs || [];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Set initial states
    if (headerRef.current) {
      gsap.set(headerRef.current.children, { opacity: 0, y: 30 });
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

    // Animate blog cards
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
    <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20">
      <div className="container mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="flex flex-col md:flex-row items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
          <div className="w-full md:w-2/3">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">{label}</span>
              <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
            </div>
            <h2 className="font-semibold text-black mb-3 sm:mb-4 leading-tight">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
              {description}
            </p>
          </div>
          
          <div className="w-full md:w-1/3 flex justify-start md:justify-end">
            <Link
              href={buttonLink}
              className="btn btn-primary"
            >
              {buttonText}
            </Link>
          </div>
        </div>

        {/* Blogs Grid - First card big, other 2 small */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className={index === 0 ? "sm:col-span-2 lg:col-span-2" : "sm:col-span-1 lg:col-span-1"}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;

