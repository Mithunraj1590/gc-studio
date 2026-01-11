"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutGridProps {
  data?: {
    label?: string;
    title?: string;
    description?: string;
    images?: {
      topLeft?: string;
      bottomLeft?: string;
      right?: string;
    };
  };
}

const AboutGrid: React.FC<AboutGridProps> = ({ data }) => {
  const pathname = usePathname();
  const label = data?.label || "About Us";
  const title = data?.title || "Driven By Creativity, Committed To Excellence.";
  const description = data?.description || "Our team blends strategy, design, and technology to craft solutions that not only look great but also deliver measurable results.";
  const images = data?.images || {};

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Set initial states
    if (headerRef.current) {
      gsap.set(headerRef.current.children, { opacity: 0, y: 30 });
    }
    if (topLeftRef.current) {
      gsap.set(topLeftRef.current, { opacity: 0, x: -50 });
    }
    if (bottomLeftRef.current) {
      gsap.set(bottomLeftRef.current, { opacity: 0, x: -50 });
    }
    if (rightRef.current) {
      gsap.set(rightRef.current, { opacity: 0, x: 50 });
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

    // Animate images with stagger
    if (gridRef.current) {
      const imageElements: HTMLDivElement[] = [];
      if (topLeftRef.current) imageElements.push(topLeftRef.current);
      if (bottomLeftRef.current) imageElements.push(bottomLeftRef.current);
      if (rightRef.current) imageElements.push(rightRef.current);

      if (imageElements.length > 0) {
        const trigger = ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(imageElements, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            });
          },
        });
        triggers.push(trigger);
      }
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
        <div ref={headerRef} className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center">
          <h2 className="h2 font-semibold text-black mb-4 sm:mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Image Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {/* Left Column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Top Left Image */}
            {images.topLeft && (
              <div ref={topLeftRef} className="relative aspect-[5/3] rounded-lg overflow-hidden">
                <Image
                  src={images.topLeft}
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Bottom Left Image */}
            {images.bottomLeft && (
              <div ref={bottomLeftRef} className="relative aspect-[5/3] rounded-lg overflow-hidden">
                <Image
                  src={images.bottomLeft}
                  alt="Team working"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Right Vertical Image - Height matches left column (2 images + gap) */}
          {images.right && (
            <div ref={rightRef} className="relative rounded-lg overflow-hidden h-full">
              <Image
                src={images.right}
                alt="Team member"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default AboutGrid;

