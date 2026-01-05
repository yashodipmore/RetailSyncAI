'use client';

import { useState } from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  year: string;
  color: string;
  initial: string;
  expertise: string;
  image: string;
}

export default function TeamMemberCard({ name, role, year, color, initial, expertise, image }: TeamMemberProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Avatar */}
      <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-5 overflow-hidden`}>
        {!imageError ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover" 
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="font-inter font-bold text-3xl text-white">{initial}</span>
        )}
      </div>
      
      {/* Info */}
      <div className="text-center">
        <h3 className="font-inter font-semibold text-lg text-gray-900 mb-1">{name}</h3>
        <p className="font-inter text-sm text-violet-600 font-medium mb-1">{role}</p>
        <p className="font-inter text-xs text-gray-400 mb-4">{year}</p>
        
        {/* Expertise Tag */}
        <span className="inline-block px-3 py-1 bg-gray-50 rounded-full text-xs font-inter font-medium text-gray-500">
          {expertise}
        </span>
      </div>
    </div>
  );
}
