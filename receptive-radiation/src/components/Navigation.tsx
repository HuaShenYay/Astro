import { useState } from 'react';

interface NavigationProps {
  currentPage?: 'home' | 'work' | 'about';
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <nav className="flex justify-center">
      <div 
        className="inline-flex gap-6 md:gap-8 px-6 md:px-8 py-3 md:py-3.5 text-sm font-medium text-[#262626] rounded-full backdrop-blur-xl bg-white/60 border border-white/20 shadow-lg"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <a 
          href="/" 
          className={`relative transition-all duration-200 ${
            currentPage === 'home' 
              ? 'underline decoration-1 underline-offset-2 decoration-[#262626] font-semibold' 
              : 'hover:text-[#525252]'
          }`}
          onMouseEnter={() => setHoveredLink('home')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Home
        </a>
        <a 
          href="/work" 
          className={`relative transition-all duration-200 ${
            currentPage === 'work' 
              ? 'underline decoration-1 underline-offset-2 decoration-[#262626] font-semibold' 
              : 'hover:text-[#525252]'
          }`}
          onMouseEnter={() => setHoveredLink('work')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Work
        </a>
        <a 
          href="/about-me" 
          className={`relative transition-all duration-200 ${
            currentPage === 'about' 
              ? 'underline decoration-1 underline-offset-2 decoration-[#262626] font-semibold' 
              : 'hover:text-[#525252]'
          }`}
          onMouseEnter={() => setHoveredLink('about')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          About
        </a>
      </div>
    </nav>
  );
}

