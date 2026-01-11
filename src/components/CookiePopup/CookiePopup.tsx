"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const CookiePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const COOKIE_CONSENT_KEY = 'cookie-consent';

  useEffect(() => {
    // Check if user has already given consent
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        // Show popup after a short delay
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    if (isVisible && popupRef.current && overlayRef.current) {
      // Animate popup in
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
      );

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isVisible]);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
      hidePopup();
    }
  };

  const handleDecline = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
      hidePopup();
    }
  };

  const hidePopup = () => {
    if (popupRef.current && overlayRef.current) {
      gsap.to(popupRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setIsVisible(false),
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    } else {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        onClick={handleDecline}
        aria-hidden="true"
      />

      {/* Popup */}
      <div
        ref={popupRef}
        className="fixed bottom-0 right-4 sm:max-w-md z-[9999] bg-white rounded-lg shadow-2xl m-4 sm:m-0"
        role="dialog"
        aria-labelledby="cookie-popup-title"
        aria-describedby="cookie-popup-description"
      >
        <div className="p-6 sm:p-8">
          <h3
            id="cookie-popup-title"
            className="h4 text-gray-900 font-semibold mb-3"
          >
            Cookie Consent
          </h3>
          <p
            id="cookie-popup-description"
            className="para text-gray-700 mb-6 leading-relaxed"
          >
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.{' '}
            <Link
              href="/privacy-policy"
              className="text-black underline hover:text-gray-700 transition-colors"
            >
              Learn more
            </Link>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleAccept}
              className="btn btn-primary"
              aria-label="Accept all cookies"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="btn btn-outline-primary"
              aria-label="Decline cookies"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePopup;

