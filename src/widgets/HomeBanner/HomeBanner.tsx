"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { gsap } from 'gsap';
import 'swiper/css';
import 'swiper/css/pagination';

interface SlideData {
  title: string;
  link: string;
  backgroundImage?: string;
  thumbnail?: string;
}

interface HomeBannerProps {
  data?: {
    bannerslides?: SlideData[];
  };
}

const HomeBanner: React.FC<HomeBannerProps> = ({ data }) => {
  const pathname = usePathname();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Check if image is external URL
  const isExternalUrl = (path: string | undefined | null): boolean => {
    if (!path || typeof path !== 'string' || path.trim() === '') return false;
    const trimmedPath = path.trim();
    return trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://');
  };

  // Normalize image path - ensure it starts with / for local images
  const normalizeImagePath = (path: string | undefined | null, fallback: string = ''): string => {
    if (!path || typeof path !== 'string' || path.trim() === '') return fallback;
    
    const trimmedPath = path.trim();
    
    // Don't normalize external URLs - return empty for Next.js Image
    if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) {
      return '';
    }
    
    // If it doesn't start with /, add it
    return trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`;
  };

  const slides: SlideData[] = data?.bannerslides || [];
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getNextSlideIndex = (): number => {
    if (!swiperRef.current || slides.length === 0) return 0;
    const currentIndex = swiperRef.current.realIndex;
    return (currentIndex + 1) % slides.length;
  };

  const nextSlide = slides.length > 0 ? slides[getNextSlideIndex()] : null;

  // Calculate thumbnail image for next slide preview
  const thumbnailSrc = nextSlide?.thumbnail || nextSlide?.backgroundImage;
  const isThumbnailExternal = thumbnailSrc ? isExternalUrl(thumbnailSrc) : true;
  const localThumbnailPath = thumbnailSrc ? normalizeImagePath(thumbnailSrc, '') : '';
  const hasThumbnailImage = !isThumbnailExternal && localThumbnailPath;

  useEffect(() => {
    // Animate banner content on mount and route changes
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.from(ref.children, {
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          delay: index * 0.3,
        });
      }
    });
  }, [activeIndex, pathname]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="hero-wrapper overflow-hidden relative h-screen">
      <Swiper
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
          bulletClass: 'hero-pagination-bullet',
          bulletActiveClass: 'hero-pagination-bullet-active',
        }}
        modules={[Autoplay, Pagination]}
        className="hero-swiper h-full"
       
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
      >
        {slides.map((slide, index) => {
          const backgroundImage = normalizeImagePath(slide.backgroundImage, '');
          return (
            <SwiperSlide 
              key={index}
              className="relative"
              style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/40 z-[1]" />
              <div className="container absolute top-1/2 left-0 right-0 -translate-y-1/2 z-[2] px-4 sm:px-6 md:px-8">
                <div 
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="hero-content"
                >
                  <h2 className="mb-3 sm:mb-4 font-normal leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl xxl:text-8xl" style={{ fontWeight: 400, lineHeight: '1.2' }}>
                    {slide.title}
                  </h2>
                  <Link 
                    href={slide.link}
                    className="inline-block no-underline mt-4 sm:mt-5 text-sm sm:text-base md:text-lg"
                  >
                    Learn More <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {nextSlide && slides.length > 0 && (
        <div className="container absolute left-0 right-0 z-10 pointer-events-none px-4 sm:px-6 md:px-8" style={{ bottom: '100px' }}>
          <div className="flex justify-end">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-black/40 backdrop-blur-md rounded-none p-2 sm:p-3 md:p-4  shadow-lg pointer-events-auto">
              {hasThumbnailImage && (
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-none overflow-hidden flex-shrink-0 border border-white/20">
                  <Image 
                    src={localThumbnailPath} 
                    alt={nextSlide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mb-1">Next</div>
                <div className="text-xs sm:text-sm font-medium text-white mb-2 line-clamp-1">
                  {nextSlide.title}
                </div>
                <div className="hero-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeBanner;
