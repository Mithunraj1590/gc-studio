"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TwoColumnSectionProps {
  data?: {
    items?: Array<{
      title?: string;
      text?: string;
    }>;
  };
}

const TwoColumnSection: React.FC<TwoColumnSectionProps> = ({ data }) => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);
  const currentPhaseRef = useRef<number>(0);

  const items = data?.items || [];

  useEffect(() => {
    if (!sectionRef.current || !div1Ref.current || !div2Ref.current || !div3Ref.current || !div4Ref.current) return;

    const section = sectionRef.current;
    const div1 = div1Ref.current;
    const div2 = div2Ref.current;
    const div3 = div3Ref.current;
    const div4 = div4Ref.current;
    const h2 = h2Ref.current || div1?.querySelector('h2.stickytitle') as HTMLHeadingElement;
    const span2 = span2Ref.current || div1?.querySelector('h2.stickytitle .span2') as HTMLSpanElement;

    // Set initial state: Div 1 visible, others hidden, --size-blend at 0%
    gsap.set(div1, { opacity: 1, display: 'flex' });
    gsap.set(div2, { opacity: 0, display: 'none' });
    gsap.set(div3, { opacity: 0, display: 'none' });
    gsap.set(div4, { opacity: 0, display: 'none' });
    if (span2) {
      span2.style.setProperty('--size-blend', '0%');
    }

    // Calculate scroll distance (4 sections: h2 animation + 3 divs)
    // Each section gets equal scroll time
    const scrollDistance = window.innerHeight * 4;

    // Create ScrollTrigger with pin
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        let newPhase = 0;

        // Determine current phase
        if (progress < 0.25) {
          newPhase = 1;
        } else if (progress >= 0.25 && progress < 0.5) {
          newPhase = 2;
        } else if (progress >= 0.5 && progress < 0.75) {
          newPhase = 3;
        } else {
          newPhase = 4;
        }

        // Only animate if phase changed
        if (newPhase !== currentPhaseRef.current) {
          currentPhaseRef.current = newPhase;

          // Phase 1 (0% to 25%): Animate h2 --size-blend from 0% to 150%, div1 visible
          if (newPhase === 1) {
            gsap.set(div1, { display: 'flex' });
            gsap.to(div1, { opacity: 1, duration: 0.5, ease: 'power2.out' });
            gsap.to(div2, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(div2, { display: 'none' }) });
            gsap.to(div3, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(div3, { display: 'none' }) });
            gsap.to(div4, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(div4, { display: 'none' }) });
          }
          // Phase 2 (25% to 50%): Show div2
          else if (newPhase === 2) {
            gsap.to(div1, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(div1, { display: 'none' }) });
            gsap.set(div2, { display: 'flex' });
            gsap.to(div2, { opacity: 1, duration: 0.5, ease: 'power2.out' });
            gsap.to(div3, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(div3, { display: 'none' }) });
            gsap.to(div4, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(div4, { display: 'none' }) });
          }
          // Phase 3 (50% to 75%): Show div3
          else if (newPhase === 3) {
            gsap.to(div1, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(div1, { display: 'none' }) });
            gsap.to(div2, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(div2, { display: 'none' }) });
            gsap.set(div3, { display: 'flex' });
            gsap.to(div3, { opacity: 1, duration: 0.5, ease: 'power2.out' });
            gsap.to(div4, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(div4, { display: 'none' }) });
          }
          // Phase 4 (75% to 100%): Show div4
          else if (newPhase === 4) {
            gsap.to(div1, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(div1, { display: 'none' }) });
            gsap.to(div2, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(div2, { display: 'none' }) });
            gsap.to(div3, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(div3, { display: 'none' }) });
            gsap.set(div4, { display: 'flex' });
            gsap.to(div4, { opacity: 1, duration: 0.5, ease: 'power2.out' });
          }
        }

        // Always update --size-blend during phase 1
        if (progress < 0.25 && span2) {
          const blendValue = (progress / 0.25) * 150;
          span2.style.setProperty('--size-blend', `${blendValue}%`);
        } else if (span2 && progress >= 0.25) {
          span2.style.setProperty('--size-blend', '150%');
        }
      },
      onLeave: () => {
        // Ensure pin is released when leaving the section
        ScrollTrigger.refresh();
      },
    });

    // Refresh ScrollTrigger after setup to prevent jumping
    ScrollTrigger.refresh();

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [pathname]);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: '100vh', minHeight: '100vh' }}>
      <div className="relative w-full h-full">
        {items.length > 0 && items[0] && (
          <div
            ref={div1Ref}
            className="absolute inset-0 w-full h-full bg-black flex items-center justify-center text-white text-4xl z-10"
          >
            <div className='max-w-[60%] mx-auto relative'>
              <h2 ref={h2Ref} className="h2 text-white stickytitle">
                <span className="text-white span1">{items[0].title || items[0].text || ''}</span>
                <span ref={span2Ref} className="text-white span2" style={{ '--size-blend': '0%' } as React.CSSProperties}>{items[0].title || items[0].text || ''}</span>
              </h2>
            </div>
          </div>
        )}
        {items.length > 1 && items[1] && (
          <div
            ref={div2Ref}
            className="absolute inset-0 w-full h-full bg-black flex items-center justify-center text-white z-20"
          >
            <div className='max-w-[60%] mx-auto text-center'>
              <h2 className="h2 text-white mb-4">{items[1].title || ''}</h2>
              <p className="para text-white">{items[1].text || ''}</p>
            </div>
          </div>
        )}
        {items.length > 2 && items[2] && (
          <div
            ref={div3Ref}
            className="absolute inset-0 w-full h-full bg-black flex items-center justify-center text-white z-30"
          >
            <div className='max-w-[60%] mx-auto text-center'>
              <h2 className="h2 text-white mb-4">{items[2].title || ''}</h2>
              <p className="para text-white">{items[2].text || ''}</p>
            </div>
          </div>
        )}
        {items.length > 3 && items[3] && (
          <div
            ref={div4Ref}
            className="absolute inset-0 w-full h-full bg-black flex items-center justify-center text-white z-40"
          >
            <div className='max-w-[60%] mx-auto text-center'>
              <h2 className="h2 text-white mb-4">{items[3].title || ''}</h2>
              <p className="para text-white">{items[3].text || ''}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TwoColumnSection;

