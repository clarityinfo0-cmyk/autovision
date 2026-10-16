import React, { useEffect, useRef } from 'react';

interface TechParticlesProps {
  className?: string;
  count?: number;
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
  glowColor: string;
}

export const TechParticles: React.FC<TechParticlesProps> = ({
  className = '',
  count = 38,
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    // Color palette matching AutoVisión neon palette
    const colors = [
      { fill: '#22d3ee', glow: 'rgba(6, 182, 212, 0.45)' }, // Cyan
      { fill: '#38bdf8', glow: 'rgba(56, 189, 248, 0.4)' }, // Sky
      { fill: '#f472b6', glow: 'rgba(244, 114, 182, 0.35)' }, // Neon Pink
      { fill: '#c084fc', glow: 'rgba(192, 132, 252, 0.35)' }, // Purple
      { fill: '#ffffff', glow: 'rgba(255, 255, 255, 0.6)' }  // Pure White Spark
    ];

    // Generate particles
    const particles: Particle[] = Array.from({ length: count }, () => {
      const col = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, // Gentle horizontal sway
        vy: -0.2 - Math.random() * 0.45,   // Slow upward float
        size: Math.random() * 1.8 + 0.8,   // Subtle micro size (0.8px - 2.6px)
        baseAlpha: Math.random() * 0.45 + 0.25,
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        pulsePhase: Math.random() * Math.PI * 2,
        color: col.fill,
        glowColor: col.glow
      };
    });

    let mouseX = -1000;
    let mouseY = -1000;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e && e.touches.length > 0) {
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      } else if ('clientX' in e) {
        mouseX = (e as MouseEvent).clientX - rect.left;
        mouseY = (e as MouseEvent).clientY - rect.top;
      }
    };

    const handlePointerLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let lastTime = performance.now();
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.66, 2);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Twinkle oscillation
        p.pulsePhase += p.pulseSpeed * dt;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.2;

        // Mouse/Touch gentle repulsion
        if (mouseX > -500) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 75 && dist > 0) {
            const force = (75 - dist) / 75;
            p.x += (dx / dist) * force * 1.5 * dt;
            p.y += (dy / dist) * force * 1.5 * dt;
          }
        }

        // Loop boundaries seamlessly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Render Particle Spark
        const currentAlpha = Math.max(0.05, Math.min(p.alpha, 0.95));

        // Outer soft glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.glowColor;
        ctx.globalAlpha = currentAlpha * 0.6;
        ctx.fill();

        // Inner core spark
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [count, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-10 w-full h-full ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
