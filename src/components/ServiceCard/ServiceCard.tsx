"use client";

import React from 'react';
import Link from 'next/link';

interface Service {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  isActive,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Link href={service.link || "/service-details"}>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`
          relative rounded-lg p-8 flex flex-col justify-between items-start
          transition-all duration-500 cursor-pointer h-[450px] overflow-hidden bg-[#1A1A1A]
          ${isActive ? 'bg-white' : 'bg-gray-800'}
        `}
        style={{
          border: isActive 
            ? '1px solid rgba(254, 254, 254, 0.4)' 
            : '1px solid rgba(254, 254, 254, 0.2)'
        }}
      >
        <span className={`material-symbols-outlined text-6xl mb-auto transition-colors duration-300 ${isActive ? 'text-black' : 'text-black'}`}>
          {service.icon}
        </span>
        <div
          className={`
            mt-auto w-full transition-all duration-500
            ${isActive 
              ? 'translate-y-0' 
              : 'translate-y-8'
            }
          `}
        >
          <h3 className={` h5 font-semibold transition-colors duration-300 ${isActive ? 'text-black' : 'text-[#C8C8CD]'}`}>
            {service.title}
          </h3>
          <p className={`text-[16px] mt-2 font-[300] transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            {service.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;

