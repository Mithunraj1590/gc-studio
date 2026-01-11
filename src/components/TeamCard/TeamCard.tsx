"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icons from '@/styles/Icons';

interface TeamCardProps {
  member: {
    name: string;
    role: string;
    image: string;
    linkedin?: string;
  };
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="flex flex-col">
      {/* Team Member Photo */}
      <div className="relative aspect-square rounded-md overflow-hidden mb-4">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
        />
      </div>

      {/* Role with Orange Lines */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs sm:text-[14px] text-orange-500 font-medium">|</span>
        <span className="text-xs sm:text-[14px] text-gray-400 font-medium">{member.role}</span>
        <span className="text-xs sm:text-[14px] text-orange-500 font-medium">|</span>
      </div>

      {/* Name and LinkedIn */}
      <div className="flex items-center justify-between">
        <h3 className="ttl text-base sm:text-[25px] font-semibold text-black">
          {member.name}
        </h3>
        {member.linkedin && (
          <Link
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full text-black hover:bg-[#084d94] hover:text-white transition-all duration-300"
            aria-label={`${member.name} LinkedIn`}
          >
            <Icons icon="icon-linkedin" size={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default TeamCard;

