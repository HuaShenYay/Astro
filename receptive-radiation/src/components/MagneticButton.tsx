import { useRef, ReactNode } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({ 
  children, 
  className = '',
  strength = 0.3 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const [springs, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { tension: 300, friction: 20 }
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    api.start({
      x: x * strength,
      y: y * strength,
      scale: 1.05,
    });
  };

  const handleMouseLeave = () => {
    api.start({
      x: 0,
      y: 0,
      scale: 1,
    });
  };

  return (
    <animated.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: springs.x.to((x) => 
          springs.y.to((y) => 
            springs.scale.to((s) => `translate(${x}px, ${y}px) scale(${s})`)
          )
        ),
      }}
    >
      {children}
    </animated.div>
  );
}
