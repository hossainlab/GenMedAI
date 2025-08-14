import React from 'react';

interface LogoIconProps {
  className?: string;
  size?: number;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ className = '', size = 32 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 32 32" 
      fill="none" 
      width={size} 
      height={size} 
      className={className}
    >
      {/* Background */}
      <rect width="32" height="32" rx="6" fill="currentColor" fillOpacity="0.1"/>
      
      {/* DNA Helix */}
      <path 
        d="M8 8c2 2 4 4 8 4s6-2 8-4M8 24c2-2 4-4 8-4s6 2 8 4" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
        opacity="0.8"
      />
      <path 
        d="M8 12c2 2 4 4 8 4s6-2 8-4M8 20c2-2 4-4 8-4s6 2 8 4" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
        opacity="0.6"
      />
      
      {/* Central molecule */}
      <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.8"/>
      <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.4"/>
      
      {/* Connecting lines */}
      <line x1="10" y1="10" x2="16" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <line x1="22" y1="10" x2="16" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <line x1="10" y1="22" x2="16" y2="19" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <line x1="22" y1="22" x2="16" y2="19" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    </svg>
  );
};