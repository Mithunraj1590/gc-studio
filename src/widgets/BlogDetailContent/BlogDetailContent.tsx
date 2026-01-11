"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContentItem {
  type: 'heading' | 'paragraph' | 'list' | 'image';
  content?: string;
  level?: 2 | 3 | 4; // For headings: h2, h3, h4
  items?: string[]; // For lists
  image?: string;
  imageAlt?: string;
}

interface BlogDetailContentProps {
  data?: {
    sections?: ContentItem[];
  };
}

const BlogDetailContent: React.FC<BlogDetailContentProps> = ({ data }) => {
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

    // Animate content sections
    const contentElements = sectionRef.current.querySelectorAll('.content-item');
    
    contentElements.forEach((element) => {
      gsap.set(element, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: element as HTMLElement,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
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

  const renderContentItem = (item: ContentItem, index: number) => {
    switch (item.type) {
      case 'heading':
        const HeadingTag = item.level === 3 ? 'h3' : item.level === 4 ? 'h4' : 'h2';
        return (
          <HeadingTag
            key={index}
            className={`text-black leading-tight content-item ${
              item.level === 3
                ? 'h3 font-semibold  mb-4 sm:mb-6 mt-8 sm:mt-10'
                : item.level === 4
                ? 'text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8'
                : 'h2 font-semibold text-gray-900 mb-6 sm:mb-8 mt-12 sm:mt-16'
            }`}
          >
            {item.content}
          </HeadingTag>
        );

      case 'paragraph':
        return (
          <p
            key={index}
            className="para content-item text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8"
          >
            {item.content}
          </p>
        );

      case 'list':
        return (
          <ul
            key={index}
            className="content-item list-none space-y-4 mb-6 sm:mb-8 ml-4 sm:ml-6"
          >
            {item.items?.map((listItem, itemIndex) => (
              <li
                key={itemIndex}
                className="text-base sm:text-lg text-gray-700 leading-relaxed flex items-start gap-3"
              >
                <span className="text-gray-400 mt-2 flex-shrink-0">•</span>
                <span>{listItem}</span>
              </li>
            ))}
          </ul>
        );

      case 'image':
        if (!item.image || item.image.trim() === '') {
          return null;
        }
        const trimmedImage = item.image.trim();
        const imageSrc = trimmedImage.startsWith('http://') || trimmedImage.startsWith('https://')
          ? trimmedImage
          : trimmedImage.startsWith('/')
          ? trimmedImage
          : `/${trimmedImage}`;
        return (
          <div
            key={index}
            className="content-item relative w-full aspect-[16/10] rounded-md overflow-hidden bg-gray-100 my-8 sm:my-12"
          >
            <Image
              src={imageSrc}
              alt={item.imageAlt || 'Blog content image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (!sections || sections.length === 0) {
    return (
      <section className="w-full pb-12 sm:pb-16 md:pb-20 lg:pb-[100px] relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-500 py-12">No data available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="w-full pb-12 sm:pb-16 md:pb-20 lg:pb-[100px] relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {sections.map((item, index) => renderContentItem(item, index))}
        </div>
      </div>
    </section>
  );
};

export default BlogDetailContent;

