"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutItem {
  text: string;
}

interface Partner {
  image: string;
  alt?: string;
}

interface AboutSectionProps {
  data?: {
    title?: string;
    description?: string;
    aboutItems?: AboutItem[];
    buttonText?: string;
    buttonLink?: string;
    mainImage?: string;
    clientImages?: string[];
    clientCount?: string;
    clientText?: string;
    partnerCount?: string;
    partnerText?: string;
    partners?: Partner[];
  };
}

const defaultAboutItems: AboutItem[] = [
  { text: "Simplicity The Biggest Idea A Looked" },
  { text: "Mastering The Art Of Conversion" },
  { text: "Keeping Advertising Standards High" },
];

const defaultPartners: Partner[] = [
  { image: "/assets/img/partner-img/1.png", alt: "Partner 1" },
  { image: "/assets/img/partner-img/2.png", alt: "Partner 2" },
  { image: "/assets/img/partner-img/3.png", alt: "Partner 3" },
  { image: "/assets/img/partner-img/4.png", alt: "Partner 4" },
  { image: "/assets/img/partner-img/3.png", alt: "Partner 5" },
  { image: "/assets/img/partner-img/5.png", alt: "Partner 6" },
];

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M12.1473 23.354C12.144 23.354 12.1402 23.354 12.1369 23.354C12.0013 23.3512 11.8733 23.2932 11.7814 23.1937L2.40471 12.9978C2.24392 12.8228 2.22916 12.5592 2.36971 12.3672C2.51025 12.1758 2.76619 12.1102 2.98166 12.2108L11.5638 16.2293C11.636 16.2632 11.7213 16.2468 11.7765 16.1893L24.8676 2.50708C25.0448 2.32169 25.3346 2.30145 25.5359 2.46114C25.7371 2.62083 25.7836 2.90739 25.6431 3.12231L12.6209 23.0712C12.6023 23.1002 12.5804 23.1265 12.5563 23.1511L12.4989 23.2085C12.4054 23.3015 12.2785 23.354 12.1473 23.354Z"
      fill="#000"
    />
  </svg>
);

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  const pathname = usePathname();
  const title = data?.title || "Passionate About Quality Design";
  const description = data?.description || "If you ask our clients what it's like working with 36, they'll talk about how much we care about their success. For us, real relationships fuel real success.";
  const aboutItems = data?.aboutItems || defaultAboutItems;
  const buttonText = data?.buttonText || "MORE ABOUT US";
  const buttonLink = data?.buttonLink;
  // Normalize image path - ensure it starts with / for local images
  const normalizeImagePath = (path: string | undefined | null, fallback: string): string => {
    // Handle null, undefined, or non-string values
    if (!path || typeof path !== 'string' || path.trim() === '') return fallback;
    
    const trimmedPath = path.trim();
    
    // If it's already a full URL, return as is
    if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) {
      return trimmedPath;
    }
    
    // If it doesn't start with /, add it
    return trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`;
  };
  const mainImage = normalizeImagePath(data?.mainImage, "/images/6.jpg");
  const clientImages = data?.clientImages || [
    "/assets/img/bg-img/5.jpg",
    "/assets/img/bg-img/4.jpg",
    "/assets/img/bg-img/3.jpg",
    "/assets/img/bg-img/2.jpg",
  ];
  const clientCount = data?.clientCount || "2566+";
  const clientText = data?.clientText || "More Then Clients Global Reviews";
  const partnerCount = data?.partnerCount || "2337+";
  const partnerText = data?.partnerText || "Our Trusted & Valuable Clients";
  // Normalize partner images
  const partners = (data?.partners || defaultPartners).map(partner => ({
    ...partner,
    image: normalizeImagePath(partner.image, "/assets/img/partner-img/1.png")
  }));

  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const triggers: ScrollTrigger[] = [];

    // Set initial states
    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 0, x: -50 });
    }
    if (contentRef.current) {
      gsap.set(contentRef.current.children, { opacity: 0, y: 30 });
    }
    if (partnersRef.current) {
      const partnerImages = partnersRef.current.querySelectorAll('.partner-image');
      gsap.set(partnerImages, { opacity: 0, scale: 0.8 });
    }

    // Animate image
    if (imageRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(imageRef.current!, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(trigger);
    }

    // Animate content
    if (contentRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(contentRef.current!.children, {
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

    // Animate partners
    if (partnersRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: partnersRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          const partnerImages = partnersRef.current!.querySelectorAll('.partner-image');
          gsap.to(partnerImages, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
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
    <section ref={sectionRef} className="w-full py-[100px]">
      {/* Divider */}
      <div className="w-full h-px bg-gray-300"></div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Left Column - Image */}
          {mainImage && mainImage.trim() !== '' && (
            <div ref={imageRef} className="w-full md:w-1/2">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={mainImage}
                  alt="About us"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    console.error('Image load error:', mainImage);
                  }}
                />
              </div>
            </div>
          )}

          {/* Right Column - Content */}
          <div ref={contentRef} className="w-full md:w-1/2 md:pl-8">
            <div className="mb-6">
              <h2 className="h2 leading-tight font-semibold text-gray-900 mb-0">
                {title}
              </h2>
            </div>

            <p className="text-gray-600 mb-6">
              {description}
            </p>

            <ul className="list-none p-0 mb-6 space-y-4">
              {aboutItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-700">{item.text}</span>
                </li>
              ))}
            </ul>

            {buttonLink && (
              <div>
                <Link
                  href={buttonLink}
                  className="btn btn-primary"
                >
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    {buttonText}
                  </span>

                </Link>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Partners Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/4">
            <h4 className="ttl text-xl md:text-[28px] mb-0">
              <span className="text-primary">{partnerCount}</span>{' '}
              {partnerText}
            </h4>
          </div>

          <div className="w-full md:w-3/4 md:ml-8">
            <div ref={partnersRef} className="flex flex-wrap items-center justify-between gap-6">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="relative h-12 w-24 opacity-60 hover:opacity-100 transition-opacity duration-300 partner-image"
                >
                  <Image
                    src={partner.image}
                    alt={partner.alt || `Partner ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 96px, 96px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



    </section>
  );
};

export default AboutSection;

