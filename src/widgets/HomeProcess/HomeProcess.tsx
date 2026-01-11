"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

interface HomeProcessProps {
  data?: {
    label?: string;
    title?: string;
    description?: string;
    steps?: ProcessStep[];
  };
}

const HomeProcess: React.FC<HomeProcessProps> = ({ data }) => {
  const pathname = usePathname();
  const label = data?.label || "Our Process";
  const title = data?.title || "Turning Ideas Into Meaningful Experiences";
  const description = data?.description || "Every step of our process is built to align with your goals and create measurable impact.";
  const steps = data?.steps || [];

  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !pinContainerRef.current || steps.length === 0) return;

    const section = sectionRef.current;
    const stepElements = stepRefs.current.filter(ref => ref !== null) as HTMLDivElement[];

    if (stepElements.length === 0) return;

    // Set initial state: All steps visible in their current positions
    // Each step starts at its natural position (index * card height + gap)
    const cardHeight = 488;
    const gap = 32; // gap-8 = 32px
    
    stepElements.forEach((step, index) => {
      const initialY = index * (cardHeight + gap);
      gsap.set(step, { 
        opacity: 1, 
        y: initialY, 
        zIndex: 10 + index 
      });
    });

    // Calculate scroll distance based on number of steps
    const scrollDistance = window.innerHeight * steps.length * 0.8;

    // Create ScrollTrigger to pin the section when it reaches top
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: section,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const stepProgress = 1 / steps.length;
        const cardHeight = 488;
        const gap = 32;

        stepElements.forEach((step, index) => {
          const stepStart = index * stepProgress;
          const stepEnd = (index + 1) * stepProgress;
          const initialY = index * (cardHeight + gap);

          if (progress >= stepStart && progress < stepEnd) {
            // Calculate progress within current step
            const progressInStep = (progress - stepStart) / stepProgress;
            // Interpolate from initial position to first step position (y: 0)
            const currentY = initialY * (1 - progressInStep);

            stepElements.forEach((s, i) => {
              const sInitialY = i * (cardHeight + gap);
              
              if (i === index) {
                // Current step animates from its position to first step position
                gsap.set(s, { opacity: 1, y: currentY, zIndex: 10 + i });
              } else if (i < index) {
                // Previous steps already at first step position
                gsap.set(s, { opacity: 1, y: 0, zIndex: 10 + i });
              } else {
                // Future steps stay at their initial positions
                gsap.set(s, { opacity: 1, y: sInitialY, zIndex: 10 + i });
              }
            });
          }
        });

        // At 100% progress, all steps at first step position
        if (progress >= 1) {
          stepElements.forEach((s, i) => {
            gsap.set(s, { opacity: 1, y: 0, zIndex: 10 + i });
          });
        }
      },
      onLeave: () => {
        ScrollTrigger.refresh();
      },
    });

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [steps.length, pathname]);

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 lg:py-[100px]">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
            <span className="text-xs sm:text-sm text-gray-500 font-medium">{label}</span>
            <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
          </div>
          <h2 className="h2 font-semibold text-black mb-3 sm:mb-4 text-center leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 text-center max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Process Steps Container - Cards will stack here */}
        <div ref={pinContainerRef} className="relative w-full" style={{ minHeight: '488px' }}>
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="absolute inset-0 bg-[#141414] rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 lg:p-12"
              style={{ height: '488px' }}
            >
              <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 md:gap-10 h-full">
                {/* Number with Orange Line */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-px h-12 sm:h-16 md:h-20 bg-orange-500"></div>
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-400">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex-shrink-0">
                  {step.icon && (
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={112}
                      height={112}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProcess;

