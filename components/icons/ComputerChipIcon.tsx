
import React from 'react';

export const ComputerChipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M15 3v6" />
        <path d="M9 21v-6" />
        <path d="M3 15h6" />
        <path d="M21 9h-6" />
    </svg>
);
