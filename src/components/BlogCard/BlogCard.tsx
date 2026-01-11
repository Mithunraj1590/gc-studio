"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  blog: {
    image: string;
    author: string;
    date: string;
    title: string;
    tags: string[];
    link?: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { image, author, date, title, tags, link = "#" } = blog;

  return (
    <Link href={link} className="block group h-auto">
      <div className="flex flex-col h-full">
        {/* Blog Image */}
        <div className="relative aspect-[5/3] overflow-hidden rounded-md bg-gray-200 mb-3 sm:mb-4 flex-shrink-0">
          <Image
          fill
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Blog Info */}
        <div className="flex flex-col flex-grow">
          {/* Author and Date */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="text-xs sm:text-[14px] text-[#878787] font-medium">{author}</span>
            <span className="text-xs sm:text-[14px] text-[#878787]">|</span>
            <span className="text-xs sm:text-[14px] text-[#878787]">{date}</span>
          </div>

          {/* Title */}
          <h3 className="ttl text-lg sm:text-xl md:text-2xl lg:text-[24px] font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 flex-grow leading-tight">
            {title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-black border border-black rounded-[30px] hover:border-orange-500 hover:text-orange-500 transition-colors duration-300 whitespace-nowrap"
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
  );
};

export default BlogCard;

