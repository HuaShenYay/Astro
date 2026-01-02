import { motion } from 'framer-motion';
import { useState } from 'react';

interface NavigationFloatingProps {
  currentPage?: 'work' | 'about' | 'contact';
}

export default function NavigationFloating({ currentPage = 'work' }: NavigationFloatingProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const links = [
    { href: '/', label: 'Work', key: 'work' },
    { href: '/about-me', label: 'About', key: 'about' },
    { href: '/contact', label: 'Contact', key: 'contact' },
  ];

  return (
    <nav className="flex justify-end">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
        }}
        className="inline-flex gap-5 md:gap-6 px-4 md:px-6 py-2 md:py-2.5 bg-[#f0f0f0] rounded-full text-sm font-medium text-[#262626] backdrop-blur-sm"
        style={{
          boxShadow: isHovered 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {links.map((link) => (
          <motion.a
            key={link.key}
            href={link.href}
            className={`relative transition-colors duration-200 ${
              currentPage === link.key
                ? 'underline decoration-1 underline-offset-2 decoration-[#262626]'
                : 'hover:text-[#525252]'
            }`}
            onHoverStart={() => setHoveredLink(link.key)}
            onHoverEnd={() => setHoveredLink(null)}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {link.label}
            {hoveredLink === link.key && currentPage !== link.key && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="absolute bottom-0 left-0 h-[1px] bg-[#525252]"
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
            )}
          </motion.a>
        ))}
      </motion.div>
    </nav>
  );
}

