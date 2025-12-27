import React from "react";

/**
 * Professional Nex.Ai Logo Component
 * A modern, tech-focused hexagonal design with neural network aesthetics
 */
export const NexLogo = ({ size = 36, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer hexagon with gradient */}
      <defs>
        <linearGradient id="nexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(168, 62%, 48%)" />
          <stop offset="100%" stopColor="hsl(180, 55%, 40%)" />
        </linearGradient>
        <linearGradient id="nexGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(168, 62%, 38%)" />
          <stop offset="100%" stopColor="hsl(180, 55%, 30%)" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Background hexagon */}
      <path
        d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
        fill="url(#nexGradient)"
        filter="url(#glow)"
      />
      
      {/* Inner hexagon border */}
      <path
        d="M24 8L38 16V32L24 40L10 32V16L24 8Z"
        fill="none"
        stroke="hsl(168, 62%, 60%)"
        strokeWidth="0.5"
        opacity="0.5"
      />
      
      {/* Neural network nodes */}
      <circle cx="24" cy="16" r="2.5" fill="hsl(0, 0%, 100%)" />
      <circle cx="16" cy="24" r="2" fill="hsl(0, 0%, 100%)" opacity="0.9" />
      <circle cx="32" cy="24" r="2" fill="hsl(0, 0%, 100%)" opacity="0.9" />
      <circle cx="24" cy="32" r="2.5" fill="hsl(0, 0%, 100%)" />
      <circle cx="20" cy="20" r="1.5" fill="hsl(0, 0%, 100%)" opacity="0.7" />
      <circle cx="28" cy="20" r="1.5" fill="hsl(0, 0%, 100%)" opacity="0.7" />
      <circle cx="20" cy="28" r="1.5" fill="hsl(0, 0%, 100%)" opacity="0.7" />
      <circle cx="28" cy="28" r="1.5" fill="hsl(0, 0%, 100%)" opacity="0.7" />
      
      {/* Neural connections */}
      <g stroke="hsl(0, 0%, 100%)" strokeWidth="0.8" opacity="0.6">
        {/* Top to middle row */}
        <line x1="24" y1="16" x2="20" y2="20" />
        <line x1="24" y1="16" x2="28" y2="20" />
        
        {/* Middle connections */}
        <line x1="16" y1="24" x2="20" y2="20" />
        <line x1="16" y1="24" x2="20" y2="28" />
        <line x1="32" y1="24" x2="28" y2="20" />
        <line x1="32" y1="24" x2="28" y2="28" />
        
        {/* Cross connections */}
        <line x1="20" y1="20" x2="28" y2="28" />
        <line x1="28" y1="20" x2="20" y2="28" />
        
        {/* Bottom connections */}
        <line x1="24" y1="32" x2="20" y2="28" />
        <line x1="24" y1="32" x2="28" y2="28" />
      </g>
      
      {/* Center bright node */}
      <circle cx="24" cy="24" r="3" fill="hsl(0, 0%, 100%)" />
      <circle cx="24" cy="24" r="1.5" fill="hsl(168, 62%, 48%)" />
    </svg>
  );
};

/**
 * Full brand logo with text
 */
export const NexBrandLogo = ({ size = 36, showText = true, className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <NexLogo size={size} />
      {showText && (
        <span className="font-heading text-xl font-semibold text-foreground">
          Nex<span className="gradient-text-brand">.Ai</span>
        </span>
      )}
    </div>
  );
};

export default NexLogo;
