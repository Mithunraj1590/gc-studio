"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BlogCard from '@/components/BlogCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Blog {
  image: string;
  author: string;
  date: string;
  title: string;
  tags: string[];
  link?: string;
}

interface BlogListProps {
  data?: {
    blogs?: Blog[];
    loadMoreText?: string;
    loadMoreLink?: string;
  };
}

const BlogList: React.FC<BlogListProps> = ({ data }) => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const blogs = data?.blogs || [];
  const [displayedBlogs, setDisplayedBlogs] = useState(blogs.slice(0, 8)); // Show first 8 blogs
  const [showLoadMore, setShowLoadMore] = useState(blogs.length > 8);

  // Update displayed blogs when blogs data changes
  useEffect(() => {
    setDisplayedBlogs(blogs.slice(0, 8));
    setShowLoadMore(blogs.length > 8);
  }, [blogs.length]);

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars?.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    // Animate blog cards
    const cards = sectionRef.current.querySelectorAll('.blog-card-item');
    
    cards.forEach((card) => {
      gsap.set(card, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: card as HTMLElement,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });
    });

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
  }, [pathname, displayedBlogs]);

  const handleLoadMore = () => {
    const currentCount = displayedBlogs.length;
    const nextBatch = blogs.slice(currentCount, currentCount + 8);
    const newDisplayedBlogs = [...displayedBlogs, ...nextBatch];
    setDisplayedBlogs(newDisplayedBlogs);
    setShowLoadMore(newDisplayedBlogs.length < blogs.length);
  };

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

  // Normalize blog data with image paths
  const normalizedBlogs = displayedBlogs.map(blog => ({
    ...blog,
    image: normalizeImagePath(blog.image),
  }));

  // Featured blog (first one) and second blog for top row
  const featuredBlog = normalizedBlogs[0];
  const secondBlog = normalizedBlogs[1];
  const remainingBlogs = normalizedBlogs.slice(2);

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 lg:py-[100px] bg-white">
      <div className="container mx-auto px-4">
        {/* Top Row: Featured Blog (Large) + Second Blog */}
        {featuredBlog && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-6 sm:mb-8 md:mb-10">
            {/* Featured Blog - Large (spans 2 columns) */}
            <div className="lg:col-span-2 blog-card-item">
              <Link href={featuredBlog.link || '#'} className="block group h-full">
                <div className="flex flex-col h-full">
                  {/* Featured Blog Image */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-gray-200 mb-4 sm:mb-6 flex-shrink-0">
                    <Image
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>

                  {/* Featured Blog Info */}
                  <div className="flex flex-col flex-grow">
                    {/* Author and Date */}
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <span className="text-sm sm:text-base text-[#878787] font-medium">{featuredBlog.author}</span>
                      <span className="text-sm sm:text-base text-[#878787]">|</span>
                      <span className="text-sm sm:text-base text-[#878787]">{featuredBlog.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="h2 font-bold text-gray-900 mb-4 sm:mb-6 group-hover:text-orange-500 transition-colors duration-300 leading-tight">
                      {featuredBlog.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {featuredBlog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs sm:text-sm font-medium text-black border border-black rounded-[30px] hover:border-orange-500 hover:text-orange-500 transition-colors duration-300 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-orange-500 mt-auto"></div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Second Blog - Small (1 column) */}
            {secondBlog && (
              <div className="blog-card-item">
                <BlogCard blog={secondBlog} />
              </div>
            )}
          </div>
        )}

        {/* Remaining Blogs Grid - 3 columns */}
        {remainingBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-12">
            {remainingBlogs.map((blog, index) => (
              <div key={index} className="blog-card-item">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {showLoadMore && (
          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 border-2 border-[#EA7B7B] text-[#EA7B7B] font-medium text-base sm:text-lg hover:bg-[#EA7B7B] hover:text-white transition-all duration-300 rounded-md"
            >
              {data?.loadMoreText || 'Load More Articles'}
            </button>
          </div>
        )}

        {/* Load More Link (if provided instead of button) */}
        {!showLoadMore && data?.loadMoreLink && (
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href={data.loadMoreLink}
              className="inline-block px-8 py-3 border-2 border-[#EA7B7B] text-[#EA7B7B] font-medium text-base sm:text-lg hover:bg-[#EA7B7B] hover:text-white transition-all duration-300 rounded-md"
            >
              {data?.loadMoreText || 'Load More Articles'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;

