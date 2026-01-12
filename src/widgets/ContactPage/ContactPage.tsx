"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

// Custom styles to ensure country code is visible
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .intl-tel-input {
      width: 100% !important;
    }
    .intl-tel-input .selected-flag {

      padding-right: 8px !important;
      background-color: transparent !important;
      display: flex!important;
    }
    .intl-tel-input .selected-flag .iti-flag {
      margin-right: 6px !important;
    }
    .iti-flag.in{
     position: absolute;
     left: 0;
     flex: 0 0 20px;
    }
    .intl-tel-input .selected-dial-code {
      display: inline-block !important;
      margin-right: 6px !important;
      padding-left: 50px !important;
      color: inherit !important;
    }
    .intl-tel-input input {
      padding-left: 100px !important;
    }
  `;
  document.head.appendChild(style);
}

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
    countryCode: '',
    phone: '',
    message: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (submitStatus.type === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus.type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Get API URL
      let apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      
      // If API URL is not set, use the WordPress domain directly
      if (!apiUrl) {
        apiUrl = 'https://lightsalmon-gaur-152305.hostingersite.com';
      }
      
      // Remove trailing slash if present
      apiUrl = apiUrl.replace(/\/$/, '');
      
      // Construct the endpoint URL - only use vorix/v1/contact
      const endpoint = `${apiUrl}/vorix/v1/contact`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          countryCode: formData.countryCode,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Thank you! Your message has been sent successfully.',
        });
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          countryCode: '',
          phone: '',
          message: '',
        });
        setPhoneNumber('');
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // Handle text input - only allow letters and spaces
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  // Handle phone input - only allow numbers
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    e.target.value = value;
    handleChange(e);
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
                      <Link
                        href={data.profile.buttonLink}
                        className="btn btn-secondary"
                      >
                        {data.profile.buttonText || 'Talk Directly To Me'}
                      </Link>
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
                    onChange={handleTextInput}
                    pattern="[A-Za-z\s]+"
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
                    onChange={handleTextInput}
                    pattern="[A-Za-z\s]+"
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
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  className="w-full px-0 py-3 border-0 border-b border-[#DDDDDD] bg-transparent focus:outline-none focus:border-black transition-colors duration-300 text-base sm:text-lg"
                  required
                />
              </div>
              <div className="w-full">
                <IntlTelInput
                  containerClassName="intl-tel-input w-full"
                  inputClassName="w-full px-0 py-3 border-0 border-b border-[#DDDDDD] bg-transparent focus:outline-none focus:border-black transition-colors duration-300 text-base sm:text-lg"
                  value={phoneNumber}
                  defaultCountry="in"
                  format={false}
                  separateDialCode={true}
                  autoHideDialCode={false}
                  onPhoneNumberChange={(isValid, value, selectedCountryData, fullNumber) => {
                    // When separateDialCode is true:
                    // - value: number without country code (for input display)
                    // - fullNumber: complete number with country code (for submission)
                    // - selectedCountryData.dialCode: country code (e.g., "+91")
                    // Only allow numbers in the phone value
                    const numericValue = (value || '').replace(/[^\d]/g, '');
                    setPhoneNumber(numericValue);
                    setFormData({
                      ...formData,
                      phone: numericValue,
                      countryCode: selectedCountryData?.dialCode || '',
                    });
                  }}
                  preferredCountries={['in', 'us', 'gb', 'au', 'ca']}
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
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Submitting...'
                    : data?.contactForm?.submitButtonText || 'Submit'}
                </button>
                  {/* Success/Error Messages */}
                  {submitStatus.type && (
                  <div
                    className={`my-4 ${
                      submitStatus.type === 'success'
                        ? 'text-[#008000]'
                        : 'text-[#CD1C18]'
                    }`}
                  >
                    <p className="text-sm sm:text-base">{submitStatus.message}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;