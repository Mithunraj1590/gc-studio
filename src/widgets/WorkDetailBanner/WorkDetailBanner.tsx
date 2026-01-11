"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkDetailBannerProps {
  data?: {
    backLink?: string;
    backLinkText?: string;
    title?: string;
    description?: string;
    servicesHeading?: string;
    services?: string[];
    visitWebsiteText?: string;
    visitWebsiteLink?: string;
    mainImage?: string;
    client?: string;
    year?: string;
    timeline?: string;
  };
}

const WorkDetailBanner: React.FC<WorkDetailBannerProps> = ({ data }) => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Remove any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars?.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    // Animate content section
    if (contentRef.current) {
      const elements = contentRef.current.children;
      gsap.set(elements, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
      });
    }

    // Animate services section
    if (servicesRef.current) {
      gsap.set(servicesRef.current, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(servicesRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });
    }

    // Animate main image
    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 0, scale: 0.95 });

      ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(imageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
          });
        },
      });
    }

    // Animate metadata section
    if (metadataRef.current) {
      const items = metadataRef.current.children;
      gsap.set(items, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: metadataRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.4,
          });
        },
      });
    }

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
  }, [pathname]);

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 lg:py-[100px] bg-white">
      <div className="container mx-auto px-4">
        {/* Top Section: Content and CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          {/* Left: Project Information */}
          <div ref={contentRef} className="flex flex-col">
            {/* Back Link */}
            {data?.backLink && (
              <Link
                href={data.backLink}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-4 sm:mb-6 inline-flex items-center gap-2"
              >
                <span>←</span>
                <span>{data.backLinkText || 'Back To Projects'}</span>
              </Link>
            )}

            {/* Project Title */}
            {data?.title && (
              <h1 className="h1 font-bold text-black mb-4 sm:mb-6">
                {data.title}
              </h1>
            )}

            {/* Description */}
            {data?.description && (
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                {data.description}
              </p>
            )}
          </div>

          {/* Right: Visit Website Button */}
          <div className="flex items-start justify-end">
            {data?.visitWebsiteLink && (
              <div className="flex flex-col items-end mt-auto">
                <Link
                  href={data.visitWebsiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  {data.visitWebsiteText || 'Visit Website'}
                </Link>
              </div>
            )}
          </div>
        </div>


        {/* Services Provided - Above Image */}
        {data?.services && data.services.length > 0 && (
          <div ref={servicesRef} className="mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-gray-300">|</span>
              <h3 className="ttl text-sm sm:text-base text-black font-medium">
                {data.servicesHeading || 'Services Provided'}
              </h3>
              <span className="text-gray-300">|</span>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-black">
              {data.services.join(', ')}
            </p>
          </div>
        )}

        {/* Main Image Section */}
        {data?.mainImage && (
          <div ref={imageRef} className="mb-12 sm:mb-16 md:mb-15">
            <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden bg-gray-100">
              <Image
                src={data.mainImage}
                alt={data.title || 'Project Image'}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Bottom Metadata Section */}
        {(data?.client || data?.year || data?.timeline) && (
          <div
            ref={metadataRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-0"
          >
            {/* Client */}
            {data?.client && (
              <div>
                <span className="text-gray-300 pr-2">|</span>
                <h4 className="ttl text-sm text-gray-500 font-medium mb-2 inline-block">Client</h4>
                <span className="text-gray-300 pl-2">|</span>
                <p className="text-lg sm:text-xl font-bold text-black mt-1">
                  {data.client}
                </p>
              </div>
            )}

            {/* Year */}
            {data?.year && (
              <div>
                <span className="text-gray-300 pr-2">|</span>
                <h4 className="ttl text-sm text-gray-500 font-medium mb-2 inline-block">Year</h4>
                <span className="text-gray-300 pl-2">|</span>
                <p className="text-lg sm:text-xl font-bold text-black mt-1">
                  {data.year}
                </p>
              </div>
            )}

            {/* Timeline */}
            {data?.timeline && (
              <div>
                <span className="text-gray-300 pr-2">|</span>
                <h4 className="ttl text-sm text-gray-500 font-medium mb-2 inline-block">Timeline</h4>
                <span className="text-gray-300 pl-2">|</span>
                <p className="text-lg sm:text-xl font-bold text-black mt-1">
                  {data.timeline}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkDetailBanner;

