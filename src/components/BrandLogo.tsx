import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

// Futuristic Custom Emblem for UTKARSH 1.0
export function UtkarshLogo({ className = "text-white", size = 40 }: LogoProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Tech Hexagon */}
      <polygon
        points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.02"
      />
      
      {/* Circuit Trace Board Lines representing BCA */}
      <path
        d="M25 45H35L42 35H58L65 45H75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Stylized 'U' combining tech nodes */}
      <path
        d="M30,30 L30,55 C30,66 50,76 50,76 C50,76 70,66 70,55 L70,30"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rising Center Arrow representing progress (Utkarsh) */}
      <path
        d="M50,62 L50,22 M50,22 L38,34 M50,22 L62,34"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Connected nodes */}
      <circle cx="30" cy="30" r="3.5" fill="currentColor" />
      <circle cx="70" cy="30" r="3.5" fill="currentColor" />
      <circle cx="50" cy="62" r="4" fill="currentColor" />
    </svg>
  );
}

// Official Academic Crest Emblem for PESIAMS
export function PesiamsLogo({ className = "text-white", size = 45 }: LogoProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield Outline */}
      <path
        d="M60 10L15 32.5V70C15 92.5 60 110 60 110C60 110 105 92.5 105 70V32.5L60 10Z"
        stroke="currentColor"
        strokeWidth="3.5"
        fill="currentColor"
        fillOpacity="0.04"
        strokeLinejoin="round"
      />
      
      {/* Open Book of Knowledge representing Academia */}
      <path
        d="M60 48V82 M35 72C45 72 60 76 60 76 C60 76 75 72 85 72 M35 56C45 56 60 60 60 60 C60 60 75 56 85 56"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Star of Excellence */}
      <polygon
        points="60,20 63,27 71,27 65,31 67,38 60,34 53,38 55,31 49,27 57,27"
        fill="currentColor"
      />

      {/* Ribbon Divider banner */}
      <path
        d="M22 92C38 97 82 97 98 92"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
