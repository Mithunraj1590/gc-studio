"use client";

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '@/components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  image: string;
  year: string;
  title: string;
  tags: string[];
  link?: string;
}

interface ProjectListProps {
  data?: {
    label?: string;
    title?: string;
    titleLine2?: string;
    description?: string;
    projects?: Project[];
  };
}

const ProjectList: React.FC<ProjectListProps> = ({ data }) => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  const projects = data?.projects || [];

  useEffect(() => {
    if (!sectionRef.current || projects.length === 0) return;

    // Remove any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars?.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    // Animate header
    if (headerRef.current) {
      const title = headerRef.current.querySelector('.project-title');
      const description = headerRef.current.querySelector('.project-description');

      // Set initial states
      if (title) {
        gsap.set(title, { opacity: 0, y: 40 });
      }
      if (description) {
        gsap.set(description, { opacity: 0, y: 30 });
      }

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (title) {
            gsap.to(title, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
            });
          }
          if (description) {
            gsap.to(description, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.2,
            });
          }
        },
      });
    }

    // Animate project cards
    if (projectsGridRef.current) {
      const cards = projectsGridRef.current.querySelectorAll('a');
      
      // Set initial states for cards
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

      ScrollTrigger.create({
        trigger: projectsGridRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: {
              amount: 0.6,
              from: 'start',
            },
            ease: 'power3.out',
            delay: 0.3,
          });
        },
      });
    }

    // Refresh ScrollTrigger
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
  }, [pathname, projects.length]);

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 lg:py-[100px]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 md:mb-20">
       

          {/* Title */}
          <h2 className="h2 font-bold text-black mb-4 sm:mb-6 project-title leading-tight">
            {data?.title || 'Projects That Speak For'}
            {data?.titleLine2 && (
              <>
                <br />
                {data.titleLine2}
              </>
            )}
          </h2>

          {/* Description */}
          {data?.description && (
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto project-description">
              {data.description}
            </p>
          )}
        </div>

         {projects.length > 0 ? (
           <div ref={projectsGridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 sm:gap-y-[60px]">
             {projects.map((project, index) => (
               <ProjectCard key={index} project={project} />
             ))}
           </div>
         ) : (
           <div className="text-center py-12 sm:py-16 md:py-20">
             <p className="text-lg sm:text-xl text-gray-500">No projects available</p>
           </div>
         )}
      </div>
    </section>
  );
};

export default ProjectList;

