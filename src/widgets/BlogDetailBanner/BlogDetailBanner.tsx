"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BlogDetailBannerProps {
  data?: {
    backLink?: string;
    backLinkText?: string;
    title?: string;
    description?: string;
    categoriesHeading?: string;
    categories?: string[];
    tags?: string[];
    readArticleText?: string;
    readArticleLink?: string;
    mainImage?: string;
    author?: string;
    date?: string;
    readTime?: string;
    sharePlatforms?: Array<'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'email' | 'copy'>;
  };
}

const BlogDetailBanner: React.FC<BlogDetailBannerProps> = ({ data }) => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get current page URL
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [pathname]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Remove any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars?.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    // Animate tags section
    if (tagsRef.current) {
      gsap.set(tagsRef.current.children, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: tagsRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(tagsRef.current!.children, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          });
        },
      });
    }

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

    // Animate share section
    if (shareRef.current) {
      gsap.set(shareRef.current, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: shareRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(shareRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
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

  // Normalize image path
  const normalizeImagePath = (path: string | undefined | null): string => {
    if (!path || typeof path !== 'string' || path.trim() === '') {
      return '/images/blog1.png';
    }
    const trimmedPath = path.trim();
    if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) {
      return trimmedPath;
    }
    return trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`;
  };

  const mainImage = normalizeImagePath(data?.mainImage);

  // Get tags/categories to display
  const displayTags = (data?.tags && data.tags.length > 0) ? data.tags : (data?.categories || []);

  // Share functionality
  const shareUrl = currentUrl;
  const shareTitle = data?.title || '';
  const platforms = data?.sharePlatforms || ['facebook', 'twitter', 'linkedin', 'copy'];

  const getShareUrl = (platform: string): string => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);

    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      case 'whatsapp':
        return `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
      case 'email':
        return `mailto:?subject=${encodedTitle}&body=${encodedTitle}%20${encodedUrl}`;
      default:
        return '';
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        );
      case 'email':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
        );
      case 'copy':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getPlatformLabel = (platform: string): string => {
    switch (platform) {
      case 'facebook':
        return 'Facebook';
      case 'twitter':
        return 'Twitter';
      case 'linkedin':
        return 'LinkedIn';
      case 'whatsapp':
        return 'WhatsApp';
      case 'email':
        return 'Email';
      case 'copy':
        return copied ? 'Copied!' : 'Copy Link';
      default:
        return '';
    }
  };

  return (
    <section ref={sectionRef} className="w-full pt-12 sm:pt-16 md:pt-20 lg:pt-[150px]">
      <div className="container mx-auto px-4">
        {/* Tags at the top */}
        {displayTags.length > 0 && (
          <div ref={tagsRef} className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
            {displayTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded-[30px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content Section: Title, Author/Date, Description */}
        <div ref={contentRef} className="mb-8 sm:mb-12">
          {/* Blog Title */}
          {data?.title && (
            <h1 className="h1 font-semibold leading-tight text-gray-900 mb-4 sm:mb-6">
              {data.title}
            </h1>
          )}

          {/* Author and Date */}
          {(data?.author || data?.date) && (
            <div className="mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-[#878787]">
                {data?.author && <span>Written By {data.author}</span>}
                {data?.author && data?.date && <span className="mx-2">|</span>}
                {data?.date && <span>{data.date}</span>}
              </p>
            </div>
          )}

          {/* Description */}
          {data?.description && (
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {/* Share Section - Above Image */}
        {platforms.length > 0 && (
          <div ref={shareRef} className="mb-6 sm:mb-8">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-base sm:text-lg font-medium text-gray-900">Share</span>
              {platforms.map((platform) => {
                if (platform === 'copy') {
                  return (
                    <button
                      key={platform}
                      onClick={handleCopyLink}
                      className="group flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      aria-label={copied ? 'Link copied!' : 'Copy link'}
                      title={copied ? 'Link copied!' : 'Copy link'}
                    >
                      <span className="transition-transform duration-300 group-hover:scale-110">
                        {getPlatformIcon(platform)}
                      </span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={platform}
                    href={getShareUrl(platform)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label={getPlatformLabel(platform)}
                    title={getPlatformLabel(platform)}
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {getPlatformIcon(platform)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Image Section */}
        {mainImage && (
          <div ref={imageRef} className="">
            <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden bg-gray-100">
              <Image
                src={mainImage}
                alt={data.title || 'Blog Image'}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 100vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogDetailBanner;

