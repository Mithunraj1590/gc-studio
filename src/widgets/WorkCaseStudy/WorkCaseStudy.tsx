"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudySection {
  heading: string;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  imageLayout?: 'default' | 'left-one-right-two';
}

interface WorkCaseStudyProps {
  data?: {
    sections?: CaseStudySection[];
  };
}

const WorkCaseStudy: React.FC<WorkCaseStudyProps> = ({ data }) => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const sections = data?.sections || [];

  useEffect(() => {
    if (!sectionRef.current || sections.length === 0) return;

    // Remove any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars?.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    // Animate each case study section
    const sectionElements = sectionRef.current.querySelectorAll('.case-study-section');
    
    sectionElements.forEach((sectionEl) => {
      const heading = sectionEl.querySelector('.case-heading');
      const title = sectionEl.querySelector('.case-title');
      const description = sectionEl.querySelector('.case-description');
      const images = sectionEl.querySelector('.case-images');

      // Set initial states
      if (heading) gsap.set(heading, { opacity: 0, y: 20 });
      if (title) gsap.set(title, { opacity: 0, y: 30 });
      if (description) gsap.set(description, { opacity: 0, y: 20 });
      if (images) gsap.set(images.children, { opacity: 0, y: 40, scale: 0.95 });

      ScrollTrigger.create({
        trigger: sectionEl as HTMLElement,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          if (heading) {
            gsap.to(heading, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            });
          }
          if (title) {
            gsap.to(title, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.1,
            });
          }
          if (description) {
            gsap.to(description, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: 0.2,
            });
          }
          if (images) {
            gsap.to(images.children, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.15,
              ease: 'power3.out',
              delay: 0.4,
            });
          }
        },
      });
    });

    // Refresh ScrollTrigger
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [pathname, sections.length]);

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 lg:py-[100px] bg-white">
      <div className="container mx-auto px-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="case-study-section mb-16 sm:mb-20 md:mb-24 lg:mb-32 last:mb-0"
          >
            <div className="flex m-auto items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
            <span className="text-xs sm:text-sm text-gray-500 font-medium uppercase">{section.heading}</span>
            <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
          </div>

            {/* Section Title */}
            <h2 className="case-title h2 font-semibold text-black text-center mb-6 sm:mb-8 max-w-4xl mx-auto leading-tight">
              {section.title}
            </h2>

            {/* Section Description */}
            <p className="case-description text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              {section.description}
            </p>

            {/* Images Section */}
            {(section.images && section.images.length > 0) || section.image ? (
              section.imageLayout === 'left-one-right-two' && section.images && section.images.length >= 3 ? (
                <div className="case-images mb-8 sm:mb-12 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10">
                  {/* Left: Single large image that spans the height of 2 images */}
                  <div className="relative w-full md:w-1/2 aspect-[16/10] md:aspect-[8/10] rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={section.images[0]}
                      alt={`${section.heading} 1`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Right: Two stacked images */}
                  <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full md:w-1/2">
                    <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={section.images[1]}
                        alt={`${section.heading} 2`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={section.images[2]}
                        alt={`${section.heading} 3`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="case-images grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-12">
                  {section.images ? (
                    section.images.map((img, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative w-full aspect-[16/10] rounded-md overflow-hidden bg-gray-100"
                      >
                        <Image
                          src={img}
                          alt={`${section.heading} ${imgIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))
                  ) : section.image ? (
                    <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden bg-gray-100 md:col-span-2">
                      <Image
                        src={section.image}
                        alt={section.heading}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              )
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkCaseStudy;

