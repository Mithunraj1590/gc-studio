"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  name: string;
}

interface Service {
  title: string;
  highlightedWord?: string;
  services: ServiceItem[];
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  video?: string;
  videoType?: 'mp4' | 'webm' | 'ogg';
}

interface ServiceListProps {
  data?: {
    services?: Service[];
  };
}

const ServiceList: React.FC<ServiceListProps> = ({ data }) => {
  const pathname = usePathname();
  const services = data?.services || [];
  const sectionRef = useRef<HTMLElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || services.length === 0) return;

    // Remove any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars?.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    const triggers: ScrollTrigger[] = [];

    // Animate each service section
    serviceRefs.current.forEach((serviceRef, index) => {
      if (!serviceRef) return;

      // Determine layout direction (alternating)
      const isEven = index % 2 === 0;
      const contentElement = serviceRef.querySelector('.service-content');
      const mediaElement = serviceRef.querySelector('.service-media');
      const titleElement = contentElement?.querySelector('h2');
      const servicesList = contentElement?.querySelector('.mt-6');
      const ctaElement = contentElement?.querySelector('a');

      // Set initial states based on layout
      if (titleElement) {
        gsap.set(titleElement, { opacity: 0, y: 30 });
      }
      if (servicesList) {
        gsap.set(servicesList.children, { opacity: 0, y: 20 });
      }
      if (ctaElement) {
        gsap.set(ctaElement, { opacity: 0, y: 20 });
      }
      if (mediaElement) {
        gsap.set(mediaElement, { opacity: 0, x: isEven ? 80 : -80, scale: 0.9 });
      }

      // Create ScrollTrigger for this service
      const trigger = ScrollTrigger.create({
        trigger: serviceRef,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          // Animate title
          if (titleElement) {
            gsap.to(titleElement, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            });
          }

          // Animate service items with stagger
          if (servicesList) {
            gsap.to(servicesList.children, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power2.out',
              delay: 0.2,
            });
          }

          // Animate CTA
          if (ctaElement) {
            gsap.to(ctaElement, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: 0.4,
            });
          }

          // Animate media with scale effect
          if (mediaElement) {
            gsap.to(mediaElement, {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              delay: 0.1,
            });
          }
        },
      });
      triggers.push(trigger);
    });

    // Refresh ScrollTrigger after animations are set up
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      triggers.forEach(trigger => trigger.kill());
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [pathname, services.length]);

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 lg:py-[100px]">
      <div className="container mx-auto px-4">
        {services.map((service, index) => {
          const titleWords = service.title.split(' ');
          const highlightedWord = service.highlightedWord || titleWords[0];
          const remainingWords = titleWords.slice(1).join(' ');
          const isEven = index % 2 === 0;

          // Content component (reusable)
          const ServiceContent = () => (
            <div className="service-content bg-white p-6 rounded-md">
              {/* Title */}
              <h2 className="h2 font-semibold text-black mb-6 sm:mb-8">
                <span className="px-3 py-1 sm:px-4 sm:py-2 inline-block">
                  {highlightedWord}
                </span>
                {remainingWords && (
                  <span className="ml-2">{remainingWords}</span>
                )}
              </h2>

              {/* Services List */}
              <div className=" mt-6 sm:mt-8">
                {service.services.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="border-b border-[#e7e7e7] py-4 sm:py-5"
                  >
                    <p className="text-base sm:text-lg md:text-xl text-gray-700">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Link */}
              {service.ctaText && (
                <div className="mt-8 sm:mt-8">
                  <Link
                    href={service.ctaLink || '#'}
                    className="text-[#013ad6] text-base sm:text-[18px] font-medium inline-flex items-center gap-2 group"
                  >
                    <span>{service.ctaText}</span>
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          );

          // Media component (reusable)
          const ServiceMedia = () => (
            <div className="service-media rounded-md overflow-hidden">
              {service.video ? (
                <div className="relative w-full aspect-[4/4] overflow-hidden bg-black">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    preload="auto"
                  >
                    <source
                      src={service.video}
                      type={`video/${service.videoType || 'mp4'}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : service.image ? (
                <div className="relative w-full aspect-[4/4] overflow-hidden bg-black">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>
          );

          return (
            <div
              key={index}
              ref={(el) => {
                serviceRefs.current[index] = el;
              }}
              className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 last:mb-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
                {isEven ? (
                  <>
                    {/* Even index: Content left, Media right */}
                    <ServiceContent />
                    <ServiceMedia />
                  </>
                ) : (
                  <>
                    {/* Odd index: Media left, Content right */}
                    <ServiceMedia />
                    <ServiceContent />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceList;

