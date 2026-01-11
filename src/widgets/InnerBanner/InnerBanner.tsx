"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface InnerBannerProps {
  data?: {
    title?: string;
    backgroundImage?: string;
  };
}

const InnerBanner: React.FC<InnerBannerProps> = ({ data }) => {
  const pathname = usePathname();
  const title = data?.title || "Page Title";
  const backgroundImage = data?.backgroundImage;

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const breadcrumbs: Array<{ label: string; href: string }> = [];
    
    // Always add Home as the first breadcrumb
    breadcrumbs.push({ label: 'Home', href: '/' });

    // If pathname is just "/", return only Home
    if (pathname === '/') {
      return breadcrumbs;
    }

    // Split pathname into segments and filter out empty strings
    const segments = pathname.split('/').filter(segment => segment !== '');

    // Build breadcrumb path progressively
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format label: capitalize first letter, replace hyphens with spaces, capitalize each word
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Last segment is current page (not a link)
      if (index === segments.length - 1) {
        breadcrumbs.push({ label, href: currentPath });
      } else {
        breadcrumbs.push({ label, href: currentPath });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const backgroundStyle = backgroundImage
    ? {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
    : {};

  return (
    <section
      className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-success-100 h-[500px] relative"
      style={backgroundStyle}
    >
      <div className="absolute w-full bottom-[50px] left-0">
        <div className="container relative px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-4 sm:mb-6">
            <nav className="flex items-center flex-wrap gap-2 text-sm sm:text-base">
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.href}>
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-white font-normal">
                      {breadcrumb.label}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={breadcrumb.href}
                        className="text-white hover:text-black transition-colors duration-200 font-medium"
                      >
                        {breadcrumb.label}
                      </Link>
                      <span className="text-white">/</span>
                    </>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Title */}
          <div className="">
            <h1 className="h1 text-white text-left font-semibold max-w-4xl leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerBanner;

