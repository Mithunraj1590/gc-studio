"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeamCard from '@/components/TeamCard';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

interface AboutTeamProps {
  data?: {
    label?: string;
    title?: string;
    description?: string;
    members?: TeamMember[];
  };
}

const AboutTeam: React.FC<AboutTeamProps> = ({ data }) => {
  const label = data?.label || "Meet The Team";
  const title = data?.title || "The People Who Make It Happen";
  const description = data?.description || "We believe the best work comes from teamwork. Our diverse team works closely to turn concepts into reality.";
  const members = data?.members || [];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate header
    if (headerRef.current) {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      });
    }

    // Animate team member cards
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 lg:py-[100px] bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div ref={headerRef} className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="flex items-center gap-2 text-left mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
            <span className="text-xs sm:text-sm text-gray-400 font-medium">{label}</span>
            <span className="text-xs sm:text-sm text-[#EA7B7B] font-medium">|</span>
          </div>
          <h2 className="h2 font-bold text-black mb-4 sm:mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl">
            {description}
          </p>
        </div>

        {/* Team Members Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {members.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;

