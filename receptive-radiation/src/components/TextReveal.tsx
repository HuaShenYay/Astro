import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const chars = text.split('');
    ref.current.innerHTML = '';
    
    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      ref.current?.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: delay + i * 0.05,
        ease: 'power3.out',
      });
    });
  }, [text, delay]);

  return <div ref={ref} className={className} />;
}
