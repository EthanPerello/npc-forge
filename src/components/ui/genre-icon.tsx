'use client';

import React from 'react';
// Import icons from Lucide React
import { 
  Wand2, // Fantasy
  Rocket, // Sci-Fi
  Scroll, // Historical
  Building, // Contemporary
  Sparkles // Default/fallback
} from 'lucide-react';

interface GenreIconProps {
  genre: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Component to render icons for genres using Lucide Icons
export default function GenreIcon({ genre, size = 'md', className = '' }: GenreIconProps) {
  // Define sizes in pixels
  const sizes = {
    sm: 20,
    md: 30,
    lg: 40,
  };
  
  // Get the pixel size
  const pixelSize = sizes[size];
  
  // Common props for all icons
  const iconProps = {
    size: pixelSize,
    className: `${className}`,
    strokeWidth: 1.5 // Thinner lines for a more elegant look
  };
  
  // Choose the icon based on genre
  switch (genre) {
    case 'fantasy':
      return <Wand2 {...iconProps} />;
      
    case 'sci-fi':
      return <Rocket {...iconProps} />;
      
    case 'historical':
      return <Scroll {...iconProps} />;
      
    case 'contemporary':
      return <Building {...iconProps} />;
      
    // Default/fallback icon
    default:
      return <Sparkles {...iconProps} />;
  }
}