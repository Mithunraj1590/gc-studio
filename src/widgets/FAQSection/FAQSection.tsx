"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  data?: {
    label?: string;
    title?: string;
    description?: string;
    faqs?: FAQItem[];
    ctaTitle?: string;
    ctaDescription?: string;
    ctaButtonText?: string;
    ctaButtonLink?: string;
  };
}

const FAQSection: React.FC<FAQSectionProps> = ({ data }) => {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number>(0);

  const label = data?.label || "FAQ";
  const title = data?.title || "Everything You Need To Know";
  const description = data?.description || "Explore our FAQs for clarity on our approach, services, and results. And if you don't see your answer, we're just a call away.";
  const faqs = data?.faqs || [];
  const ctaTitle = data?.ctaTitle || "Didn't Find Your Answer?";
  const ctaDescription = data?.ctaDescription || "We'd love to help. Book a call with our team and get answers tailored to your specific needs.";
  const ctaButtonText = data?.ctaButtonText || "Contact Us";
  const ctaButtonLink = data?.ctaButtonLink || "/contact";

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const sectionRef = useRef<HTMLElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Set initial states
    if (leftColumnRef.current) {
      gsap.set(leftColumnRef.current.children, { opacity: 0, x: -50 });
    }
    if (rightColumnRef.current) {
      const faqItems = rightColumnRef.current.querySelectorAll('[data-faq-item]');
      gsap.set(faqItems, { opacity: 0, x: 50 });
    }

    // Animate left column
    if (leftColumnRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: leftColumnRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(leftColumnRef.current!.children, {
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

    // Animate FAQ items
    if (rightColumnRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: rightColumnRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          const faqItems = rightColumnRef.current!.querySelectorAll('[data-faq-item]');
          gsap.to(faqItems, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-stretch">
          {/* Left Column - Header */}
          <div ref={leftColumnRef} className="flex flex-col h-full order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
                <span className="text-xs sm:text-sm text-gray-500 font-medium uppercase">{label}</span>
                <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
              </div>
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6 leading-tight">
                {title}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 md:mb-12">
                {description}
              </p>
            </div>

            {/* CTA Section - Hidden on mobile, shown on desktop */}
            <div className="mt-auto hidden lg:block bg-white rounded-md p-[20px]">
              <h3 className="h4 font-bold text-gray-900 mb-3 sm:mb-4">
                {ctaTitle}
              </h3>
              <p className="para text-base sm:text-lg text-gray-600 sm:mb-6 lg:mb-[30px]">
                {ctaDescription}
              </p>
              <Link
                href={ctaButtonLink}
                className="btn btn-primary text-sm sm:text-base"
              >
                {ctaButtonText}
              </Link>
            </div>
          </div>

          {/* Right Column - FAQ List */}
          <div ref={rightColumnRef} className="order-1 lg:order-2">
            <div>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  data-faq-item
                  className={`bg-white rounded-md p-4 ${index < faqs.length - 1 ? 'mb-6 sm:mb-8 md:mb-[30px]' : ''}`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`faq-btn w-full flex items-center justify-between text-left group gap-2 sm:gap-4 ${openIndex === index ? 'faq-btn-open' : ''}`}
                  >
                    <h3 className="ttl text-base sm:text-lg md:text-xl lg:text-[20px] font-medium text-gray-900 pr-2 sm:pr-4 group-hover:text-orange-500 transition-colors duration-300 flex-1">
                      {faq.question}
                    </h3>
                   
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="mt-3 sm:mt-4 pr-4 sm:pr-6 md:pr-10">
                      <p className="para text-sm sm:text-[17px] text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section - Shown on mobile only, at bottom of accordion */}
            <div className="mt-8 lg:hidden">
              <h3 className="h4 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                {ctaTitle}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                {ctaDescription}
              </p>
              <Link
                href={ctaButtonLink}
                className="btn btn-primary text-sm sm:text-base"
              >
                {ctaButtonText}
              </Link>
              <div className="w-full h-px bg-orange-500 mt-4 sm:mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

