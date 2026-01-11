"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  title: string;
  description: string;
  link?: string;
  image?: string;
  socialPost?: {
    image: string;
    likes: string;
    comments: string;
    shares: string;
    text: string;
    hashtags: string[];
  };
  tools?: Array<{
    name: string;
    logo: string;
  }>;
  services?: Array<{
    name: string;
  }>;
}

interface HomeServiceProps {
  data?: {
    label?: string;
    title?: string;
    description?: string;
    services?: Service[];
    ctaTitle?: string;
    ctaDescription?: string;
    ctaButtonText?: string;
    ctaButtonLink?: string;
    ctaImage?: string;
  };
}

const HomeService: React.FC<HomeServiceProps> = ({ data }) => {
  const pathname = usePathname();
  const label = data?.label || "Services";
  const title = data?.title || "Design, Build, And Scale With Us";
  const description = data?.description || "We help ambitious businesses move forward with services designed to attract, engage, and convert your audience.";
  const services = data?.services || [];
  const ctaTitle = data?.ctaTitle || "Ready To Elvora Your Brand?";
  const ctaDescription = data?.ctaDescription || "Let's turn your ideas into impactful designs. Book a call today and start building something remarkable.";
  const ctaButtonText = data?.ctaButtonText || "Book A Call";
  const ctaButtonLink = data?.ctaButtonLink || "/contact";
  const ctaImage = data?.ctaImage || "/images/cta-cube.png";

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const bottomGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Set initial states
    if (headerRef.current) {
      gsap.set(headerRef.current.children, { opacity: 0, y: 30 });
    }
    if (servicesGridRef.current) {
      const serviceCards = servicesGridRef.current.querySelectorAll('a');
      gsap.set(serviceCards, { opacity: 0, y: 50 });
    }
    if (bottomGridRef.current) {
      gsap.set(bottomGridRef.current.children, { opacity: 0, x: 50 });
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

    // Animate services grid
    if (servicesGridRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: servicesGridRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          const serviceCards = servicesGridRef.current!.querySelectorAll('a');
          gsap.to(serviceCards, {
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

    // Animate bottom grid
    if (bottomGridRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: bottomGridRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(bottomGridRef.current!.children, {
            opacity: 1,
            x: 0,
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
      <div className="container mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
            <span className="text-xs sm:text-sm text-gray-500 font-medium uppercase">{label}</span>
            <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
          </div>
          <h2 className="h2 font-semibold text-black mb-3 sm:mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
            {description}
          </p>
        </div>

        {/* Services Grid */}
        <div ref={servicesGridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8 lg:mb-12">
          {/* Service 1 - Digital Marketing */}
          {services[0] && (
            <Link href={services[0].link || "/services"} className="block">
              <div className='bg-white rounded-lg p-4 sm:p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
              <h3 className="ttl text-xl sm:text-2xl md:text-[30px] font-semibold text-black mb-3 sm:mb-4">
                {services[0].title}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                {services[0].description}
              </p>
              {services[0].socialPost && (
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
                  {services[0].socialPost.image && (
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 sm:mb-4">
                      <Image
                        src={services[0].socialPost.image}
                        alt="Social media post"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4 sm:gap-6 mb-2 sm:mb-3 text-xs sm:text-sm text-gray-600">
                    <span>{services[0].socialPost.likes}</span>
                    <span>{services[0].socialPost.comments}</span>
                    <span>{services[0].socialPost.shares}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 mb-2">
                    {services[0].socialPost.text}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {services[0].socialPost.hashtags.map((tag, index) => (
                      <span key={index} className="text-xs sm:text-sm text-blue-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">See more...</span>
                </div>
              )}
              </div>
            </Link>
          )}

          {/* Service 2 & 3 - Design & Development, No-Code */}
          <div>
            {services[1] && (
              <Link href={services[1].link || "/services"} className="block mb-6 sm:mb-8 lg:mb-12">
                <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <h3 className="ttl text-xl sm:text-2xl md:text-[30px] font-semibold text-black mb-3 sm:mb-4">
                  {services[1].title}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                  {services[1].description}
                </p>
                {services[1].image && (
                  <div className="relative w-full aspect-[9/12] max-w-xs mx-auto lg:mx-0">
                    <Image
                      src={services[1].image}
                      alt={services[1].title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                </div>
              </Link>
            )}

            {services[2] && (
              <Link href={services[2].link || "/services"} className="block">
                <div className='bg-white rounded-lg p-4 sm:p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
                <h3 className="ttl text-xl sm:text-2xl md:text-[30px] font-semibold text-black mb-3 sm:mb-4">
                  {services[2].title}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                  {services[2].description}
                </p>
                {services[2].tools && (
                  <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                    {services[2].tools.map((tool, index) => (
                      <div key={index} className="w-10 h-10 sm:w-12 sm:h-12 relative">
                        <Image
                          src={tool.logo}
                          alt={tool.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )}
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Section - Brand & Identity + CTA */}
        <div ref={bottomGridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand & Identity Design */}
          {services[3] && (
            <Link href={services[3].link || "/services"} className="inline-block">
              <div className='bg-white rounded-lg p-4 sm:p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
              <h3 className="ttl text-xl sm:text-2xl md:text-[30px] font-semibold text-black mb-3 sm:mb-4">
                {services[3].title}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                {services[3].description}
              </p>
              {services[3].services && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services[3].services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-lg bg-white hover:border-orange-500 transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="text-orange-500 flex-shrink-0 sm:w-5 sm:h-5"
                      >
                        <path
                          d="M16.6667 5L7.50004 14.1667L3.33337 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-xs sm:text-sm text-gray-700 font-medium">
                        {service.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              </div>
            </Link>
          )}

          {/* CTA Section */}
          <div className="relative bg-[#141414] rounded-lg p-6 sm:p-8 lg:p-12">
            <div className="relative z-10">
              <h3 className="ttl text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px] font-semibold text-white mb-3 sm:mb-4">
                {ctaTitle}
              </h3>
              <p className="text-base sm:text-lg text-white mb-6 sm:mb-8">
                {ctaDescription}
              </p>
              <Link
                href={ctaButtonLink}
                className="btn btn-secondary"
              >
                {ctaButtonText}
              </Link>
            </div>
            {ctaImage && (
              <div className="absolute -bottom-[30px] sm:-bottom-[40px] md:-bottom-[60px] -right-2 sm:-right-5 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px]">
                <Image
                  src={ctaImage}
                  alt="CTA graphic"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeService;

