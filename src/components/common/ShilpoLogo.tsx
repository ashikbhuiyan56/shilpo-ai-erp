import React from 'react';

interface ShilpoLogoProps {
  className?: string;
  size?: number | string;
  showGlow?: boolean;
}

export const ShilpoLogo: React.FC<ShilpoLogoProps> = ({
  className = 'w-9 h-9',
  showGlow = true,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {showGlow && (
        <div className="absolute inset-0 bg-purple-500/30 rounded-xl blur-md pointer-events-none -z-10 transform scale-110" />
      )}
      <svg
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(147,51,234,0.35)]"
      >
        <defs>
          {/* Top highlight gradient */}
          <linearGradient id="shilpo-top-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DDD6FE" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>

          {/* Upper outer ribbon gradient */}
          <linearGradient id="shilpo-upper-outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="40%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>

          {/* Upper inner facet (shaded) */}
          <linearGradient id="shilpo-upper-inner" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7E22CE" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>

          {/* Central isometric connector */}
          <linearGradient id="shilpo-mid-facet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>

          {/* Lower outer ribbon gradient */}
          <linearGradient id="shilpo-lower-outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>

          {/* Lower inner facet (darkest shadow) */}
          <linearGradient id="shilpo-lower-inner" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4C1D95" />
            <stop offset="100%" stopColor="#3B0764" />
          </linearGradient>

          {/* Isometric top horizontal plane */}
          <linearGradient id="shilpo-iso-top" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="60%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
        </defs>

        {/* 
          3D Isometric Hexagonal Ribbon 'S' Structure 
          Meticulously calibrated to match logo.png.png
        */}

        {/* TOP SECTION: Upper arm & peak */}
        {/* Top-most outer facet sloping from peak (50,6) to top-left (15,26) */}
        <polygon
          points="50,6 85,26 73,33 50,20 27,33 15,26"
          fill="url(#shilpo-iso-top)"
        />

        {/* Top right start block / facet */}
        <polygon
          points="85,26 85,42 73,49 73,33"
          fill="url(#shilpo-upper-outer)"
        />

        {/* Top right inner vertical face */}
        <polygon
          points="73,33 73,49 61,42 61,26"
          fill="url(#shilpo-upper-inner)"
        />

        {/* Upper-left outer vertical wall */}
        <polygon
          points="15,26 50,6 50,18 27,32 27,62 15,55"
          fill="url(#shilpo-upper-outer)"
        />

        {/* Upper-left top inner bevel */}
        <polygon
          points="27,32 50,18 73,31 61,38 50,32 27,45"
          fill="url(#shilpo-top-highlight)"
        />

        {/* Upper inner wall downward */}
        <polygon
          points="27,45 50,32 50,44 27,57"
          fill="url(#shilpo-upper-inner)"
        />

        {/* CENTER SECTION: 3D Interlocking S-crossbar fold */}
        {/* Central diagonal fold top face */}
        <polygon
          points="27,57 50,44 73,57 50,70"
          fill="url(#shilpo-iso-top)"
        />

        {/* Central crossbar front face */}
        <polygon
          points="27,57 50,70 50,82 27,69"
          fill="url(#shilpo-mid-facet)"
        />

        {/* Central inner vertical drop */}
        <polygon
          points="50,70 73,57 73,69 50,82"
          fill="url(#shilpo-lower-inner)"
        />

        {/* BOTTOM SECTION: Lower loop & base */}
        {/* Lower right outer vertical wall */}
        <polygon
          points="85,55 85,88 50,108 50,96 73,83 73,49"
          fill="url(#shilpo-lower-outer)"
        />

        {/* Lower left end-block facet */}
        <polygon
          points="15,72 27,65 27,81 15,88"
          fill="url(#shilpo-upper-inner)"
        />

        {/* Lower left inner horizontal face */}
        <polygon
          points="27,65 39,72 39,88 27,81"
          fill="url(#shilpo-mid-facet)"
        />

        {/* Bottom base facet sloping from (15,88) to bottom (50,108) */}
        <polygon
          points="15,88 27,81 50,94 73,81 85,88 50,108"
          fill="url(#shilpo-lower-inner)"
        />

        {/* Lower loop inner floor highlight */}
        <polygon
          points="27,81 50,68 73,81 50,94"
          fill="url(#shilpo-iso-top)"
        />

        {/* Inner vertical shadow crease for 3D realism */}
        <polygon
          points="50,44 50,70 42,65 42,49"
          fill="#3B0764"
          opacity="0.6"
        />

        {/* Specular edge highlight */}
        <polyline
          points="15,26 50,6 85,26"
          stroke="#FAF5FF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};
