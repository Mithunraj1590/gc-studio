"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  project: {
    image: string;
    year: string;
    title: string;
    tags: string[];
    link?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { image, year, title, tags, link = "#" } = project;

  // Normalize image path - ensure it starts with / for local images
  const normalizeImagePath = (path: string | undefined | null): string => {
    if (!path || typeof path !== 'string' || path.trim() === '') {
      return '/images/pro1.png'; // Default fallback
    }
    
    const trimmedPath = path.trim();
    
    // If it's already a full URL, return as is
    if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) {
      return trimmedPath;
    }
    
    // If it doesn't start with /, add it
    return trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`;
  };

  const normalizedImage = normalizeImagePath(image);

  return (
    <Link href={link} className="block group">
      <div className="relative overflow-hidden">
        {/* Project Image */}
        {normalizedImage && (
          <div className="aspect-[4/3] overflow-hidden rounded-md bg-gray-200 relative">
            <Image
              src={normalizedImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={(e) => {
                console.error('Image load error:', normalizedImage);
              }}
            />
          </div>
        )}

        {/* Project Info */}
        <div className="mt-3 sm:mt-4 bg-white rounded-md p-[20px]">
          {/* Year, Title, and Tags */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            {/* Year and Title Row */}
            <div className="">
              <span className="text-xs sm:text-sm text-[#878787] font-medium flex-shrink-0 block w-full mb-2">
                | {year} |
              </span>
              <h3 className="ttl text-[22px] sm:text-[25px] md:text-[30px] font-bold text-black  min-w-0">
                {title}
              </h3>
            </div>
            {/* Tags - Next line on mobile, same line on larger screens */}
            <div className="flex items-center gap-1 sm:gap-2 sm:ml-auto flex-wrap">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 text-[#878787] sm:px-3 py-1 text-[12px] sm:text-xs font-normal text-gray-700 border border-[#DDDDDD] rounded-[30px] hover:border-primary hover:text-primary transition-colors duration-300 whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

