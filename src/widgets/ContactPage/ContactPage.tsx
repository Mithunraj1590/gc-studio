"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactPageProps {
  data?: {
    label?: string;
    title?: string;
    description?: string;
    profile?: {
      image?: string;
      name?: string;
      role?: string;
      description?: string;
      buttonText?: string;
      buttonLink?: string;
    };
    contactForm?: {
      heading?: string;
      submitButtonText?: string;
      termsText?: string;
      termsLink?: string;
    };
    reachOut?: {
      heading?: string;
      email?: string;
      phone?: string;
    };
    socials?: {
      heading?: string;
      links?: Array<{
        platform: string;
        url: string;
      }>;
    };
  };
}

const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  // Normalize image path
  const normalizeImagePath = (path: string | undefined | null, fallback: string): string => {
    if (!path || typeof path !== 'string' || path.trim() === '') return fallback;
    const trimmedPath = path.trim();
    if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) return trimmedPath;
    return trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`;
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars?.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    // Animate sections
    const sections = sectionRef.current.querySelectorAll('.contact-section');
    
    sections.forEach((sectionEl) => {
      gsap.set(sectionEl, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: sectionEl as HTMLElement,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(sectionEl, {
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
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const label = data?.label || 'Book A Call';
  const title = data?.title || "Your Next Big Move Starts Here";
  const description = data?.description || "Reach out today and let's explore how our expertise can bring your vision to life. We're just a call away from turning ideas into impact.";
  const profileImage = normalizeImagePath(data?.profile?.image, '/images/team1.png');

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 lg:py-[100px]">
      <div className="container mx-auto px-4">
        {/* Top Section: Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 contact-section">
        
          <h2 className="h2 font-semibold leading-tight text-black mb-4 sm:mb-6 max-w-4xl mx-auto">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Main Content: Profile Card and Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          {/* Left: Profile Card and Bottom Sections */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {/* Profile Card */}
            {data?.profile && (
              <div className="contact-section">
                <div className="bg-black rounded-md p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                  {/* Profile Image */}
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={profileImage}
                      alt={data.profile.name || 'Profile'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                    />
                  </div>

                  {/* Profile Content */}
                  <div className="flex-1">
                    <p className="text-white text-base sm:text-lg mb-2">
                      Hi, I'm <span className="font-semibold">{data.profile.name || 'Hana Suzuki'},</span>
                    </p>
                    <h3 className="h3 text-white font-semibold leading-tight mb-4">
                      {data.profile.role || 'Client Success Manager'}
                    </h3>
                    <p className="para text-white text-sm sm:text-base mb-6 leading-relaxed">
                      {data.profile.description || "If you'd rather talk it through than type it out, I'm here and ready to chat anytime"}
                    </p>
                    {data.profile.buttonLink && (
                      <>
                        <Link
                          href={data.profile.buttonLink}
                          className="btn btn-secondary"
                        >
                          {data.profile.buttonText || 'Talk Directly To Me'}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Reach Out and Socials - Below Profile Card */}
            <div className="contact-section flex flex-col sm:flex-row gap-8 sm:gap-12">
              {/* Reach Out */}
              {data?.reachOut && (
                <div className="flex-1">
                  <h3 className="h3 font-semibold leading-tight text-black mb-4 sm:mb-6">
                    {data.reachOut.heading || 'Reach Out'}
                  </h3>
                  {data.reachOut.email && (
                    <p className="text-gray-600 text-base sm:text-lg mb-2">
                      <a href={`mailto:${data.reachOut.email}`} className="hover:text-black hover:underline transition-all duration-300">
                        {data.reachOut.email}
                      </a>
                    </p>
                  )}
                  {data.reachOut.phone && (
                    <p className="text-gray-600 text-base sm:text-lg">
                      <a href={`tel:${data.reachOut.phone.replace(/\s/g, '')}`} className="hover:text-black hover:underline transition-all duration-300">
                        {data.reachOut.phone}
                      </a>
                    </p>
                  )}
                </div>
              )}

              {/* Socials */}
              {data?.socials && data.socials.links && data.socials.links.length > 0 && (
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">
                    {data.socials.heading || 'Socials'}
                  </h3>
                  <ul className="space-y-2">
                    {data.socials.links.map((link, index) => (
                      <li key={index}>
                        <Link
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 text-base sm:text-lg hover:text-black hover:underline transition-all duration-300"
                        >
                          {link.platform}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="contact-section">
            <h2 className="h2 font-bold text-black mb-6 sm:mb-8">
              {data?.contactForm?.heading || 'Contact Us'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-0 py-3 border-0 border-b border-[#DDDDDD] bg-transparent focus:outline-none focus:border-black transition-colors duration-300 text-base sm:text-lg"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-0 py-3 border-0 border-b border-[#DDDDDD] bg-transparent focus:outline-none focus:border-black transition-colors duration-300 text-base sm:text-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-0 py-3 border-0 border-b border-[#DDDDDD] bg-transparent focus:outline-none focus:border-black transition-colors duration-300 text-base sm:text-lg"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Describe your project"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-0 py-3 border-0 border-b border-[#DDDDDD] bg-transparent focus:outline-none focus:border-black transition-colors duration-300 resize-none text-base sm:text-lg"
                  required
                ></textarea>
              </div>
              <div>
                {data?.contactForm?.termsText && (
                  <p className="para mt-0 mb-5 text-sm text-black">
                    {data.contactForm.termsText}{' '}
                    {data.contactForm.termsLink && (
                      <Link href={data.contactForm.termsLink} className="underline hover:text-gray-700">
                        terms & conditions
                      </Link>
                    )}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {data?.contactForm?.submitButtonText || 'Submit'}
                </button>
        
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

