import { useEffect, useRef } from 'react';

export default function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      if (!ctx) return;
      
      time += 0.01;
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      gradient.addColorStop(0, `rgba(147, 51, 234, ${0.05 + Math.sin(time) * 0.02})`);
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.05 + Math.cos(time * 1.2) * 0.02})`);
      gradient.addColorStop(1, `rgba(236, 72, 153, ${0.05 + Math.sin(time * 0.8) * 0.02})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
