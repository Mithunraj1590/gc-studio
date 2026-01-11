"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TabContent {
  title: string;
  description?: string;
  content?: string;
  items?: string[];
}

interface ServiceDetailAboutProps {
  data?: {
    tabs?: Array<{
      label: string;
      content: TabContent;
    }>;
  };
}

const ServiceDetailAbout: React.FC<ServiceDetailAboutProps> = ({ data }) => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const tabs = data?.tabs || [];
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    if (!sectionRef.current || tabs.length === 0) return;

    // Remove any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars?.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    // Animate section on scroll
    if (tabsRef.current) {
      gsap.set(tabsRef.current, { opacity: 0, x: -30 });
      ScrollTrigger.create({
        trigger: tabsRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(tabsRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
      });
    }

    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, x: 30 });
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(contentRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [pathname, tabs.length]);

  // Animate content change when tab changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const activeContent = tabs[activeTab]?.content;

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 lg:gap-12">
          {/* Left Side - Tabs List */}
          <div ref={tabsRef} className="lg:sticky lg:top-24 lg:self-start">
            <nav className="flex flex-col gap-2" role="tablist">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls={`tab-panel-${index}`}
                  id={`tab-${index}`}
                  className={`
                    relative
                    text-left 
                    px-6 py-4 
                    rounded-md 
                    font-semibold
                    text-base
                    transition-all 
                    duration-300 
                    ease-in-out
                   
                    focus:outline-none
                    focus:ring-none
                    focus:ring-none
                    focus:ring-none
                    ${activeTab === index
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Side - Content */}
          <div ref={contentRef} className="lg:min-h-[400px]">
            {activeContent && (
              <div
                id={`tab-panel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
              >
                {activeContent.title && (
                  <h2 className="h2 text-gray-900 font-semibold mb-4 sm:mb-6">
                    {activeContent.title}
                  </h2>
                )}

                {activeContent.description && (
                  <p className="para text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                    {activeContent.description}
                  </p>
                )}

                {activeContent.content && (
                  <div className="para text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                    {activeContent.content}
                  </div>
                )}

                {activeContent.items && activeContent.items.length > 0 && (
                  <ul className="space-y-4">
                    {activeContent.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1.5 flex-shrink-0 w-2 h-2 bg-black rounded-full" />
                        <span className="para text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailAbout;

