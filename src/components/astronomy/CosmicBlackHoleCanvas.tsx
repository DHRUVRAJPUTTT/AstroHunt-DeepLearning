import { useEffect, useRef } from 'react';

interface CosmicBlackHoleCanvasProps {
  className?: string;
  activeObject?: 'BLACK_HOLE' | 'EXOPLANET' | 'STAR' | 'ASTEROID';
}

export function CosmicBlackHoleCanvas({
  className = '',
  activeObject = 'BLACK_HOLE',
}: CosmicBlackHoleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle field around black hole / galaxy
    const particleCount = 180;
    const particles = Array.from({ length: particleCount }).map(() => {
      const radius = 40 + Math.random() * 220;
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.004 + Math.random() * 0.012) * (150 / radius);
      const size = 0.8 + Math.random() * 2.2;
      const hue = Math.random() > 0.6 ? 270 + Math.random() * 40 : 25 + Math.random() * 35;
      return { radius, angle, speed, size, hue, alpha: 0.3 + Math.random() * 0.7 };
    });

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Draw Deep Cosmic Glow & Spacetime Curvature
      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        Math.min(width, height) * 0.45
      );

      if (activeObject === 'BLACK_HOLE') {
        outerGlow.addColorStop(0, 'rgba(124, 58, 237, 0.45)');
        outerGlow.addColorStop(0.3, 'rgba(236, 72, 153, 0.2)');
        outerGlow.addColorStop(0.6, 'rgba(30, 27, 75, 0.15)');
        outerGlow.addColorStop(1, 'rgba(8, 11, 24, 0)');
      } else if (activeObject === 'EXOPLANET') {
        outerGlow.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
        outerGlow.addColorStop(0.35, 'rgba(16, 185, 129, 0.18)');
        outerGlow.addColorStop(1, 'rgba(8, 11, 24, 0)');
      } else if (activeObject === 'STAR') {
        outerGlow.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
        outerGlow.addColorStop(0.4, 'rgba(251, 191, 36, 0.18)');
        outerGlow.addColorStop(1, 'rgba(8, 11, 24, 0)');
      } else {
        outerGlow.addColorStop(0, 'rgba(249, 115, 22, 0.35)');
        outerGlow.addColorStop(0.4, 'rgba(234, 88, 12, 0.15)');
        outerGlow.addColorStop(1, 'rgba(8, 11, 24, 0)');
      }

      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Accretion Disk / Orbiting Matter Particles
      particles.forEach((p) => {
        p.angle += p.speed;
        // Elliptical projection for 3D tilt
        const tilt = 0.45;
        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * (p.radius * tilt);

        // Relativistic beaming: Left side moving towards observer is brighter
        const dopplerShift = Math.cos(p.angle) < 0 ? 1.4 : 0.6;
        const currentAlpha = Math.min(1, p.alpha * dopplerShift);

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);

        if (activeObject === 'BLACK_HOLE') {
          ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${currentAlpha})`;
        } else if (activeObject === 'EXOPLANET') {
          ctx.fillStyle = `hsla(185, 90%, 60%, ${currentAlpha})`;
        } else if (activeObject === 'STAR') {
          ctx.fillStyle = `hsla(42, 95%, 65%, ${currentAlpha})`;
        } else {
          ctx.fillStyle = `hsla(28, 90%, 60%, ${currentAlpha})`;
        }
        ctx.fill();
      });

      // 3. Central Cosmic Body
      if (activeObject === 'BLACK_HOLE') {
        // Gravitational Lensing Arc (Photon Sphere)
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 58, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 140, 0, 0.7)';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#EC4899';
        ctx.shadowBlur = 24;
        ctx.stroke();
        ctx.restore();

        // Secondary Doppler ring behind black hole
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 110, 35, -0.2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
        ctx.lineWidth = 14;
        ctx.shadowColor = '#A855F7';
        ctx.shadowBlur = 30;
        ctx.stroke();
        ctx.restore();

        // Relativistic Accretion Ring in front
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 130, 42, -0.2, 0, Math.PI);
        ctx.strokeStyle = 'rgba(251, 146, 60, 0.85)';
        ctx.lineWidth = 10;
        ctx.shadowColor = '#F97316';
        ctx.shadowBlur = 35;
        ctx.stroke();
        ctx.restore();

        // The Pitch Black Singularity Event Horizon
        ctx.beginPath();
        ctx.arc(centerX, centerY, 52, 0, Math.PI * 2);
        ctx.fillStyle = '#020308';
        ctx.fill();

        // Shadow Rim
        ctx.beginPath();
        ctx.arc(centerX, centerY, 54, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (activeObject === 'STAR') {
        // Glowing Stellar Corona
        const corona = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 70);
        corona.addColorStop(0, '#FEF08A');
        corona.addColorStop(0.3, '#F59E0B');
        corona.addColorStop(0.7, 'rgba(234, 88, 12, 0.4)');
        corona.addColorStop(1, 'rgba(234, 88, 12, 0)');

        ctx.fillStyle = corona;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        ctx.fill();

        // Stellar disk
        ctx.beginPath();
        ctx.arc(centerX, centerY, 42, 0, Math.PI * 2);
        ctx.fillStyle = '#FDE047';
        ctx.shadowColor = '#F59E0B';
        ctx.shadowBlur = 35;
        ctx.fill();
      } else if (activeObject === 'EXOPLANET') {
        // Star with planet transiting across it
        ctx.beginPath();
        ctx.arc(centerX - 35, centerY, 46, 0, Math.PI * 2);
        ctx.fillStyle = '#FDE68A';
        ctx.shadowColor = '#F59E0B';
        ctx.shadowBlur = 30;
        ctx.fill();

        // Exoplanet silhouette with atmosphere glow
        const planetX = centerX + Math.cos(time * 0.8) * 85;
        const planetY = centerY + Math.sin(time * 0.8) * 25;

        // Atmosphere halo
        ctx.beginPath();
        ctx.arc(planetX, planetY, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Night side silhouette
        ctx.beginPath();
        ctx.arc(planetX, planetY, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#080E1E';
        ctx.fill();
      } else {
        // Tumbling irregular asteroid
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(time * 0.5);

        ctx.beginPath();
        // Irregular faceted polygon for Bennu
        const r1 = 45;
        ctx.moveTo(r1 * 0.9, 0);
        ctx.lineTo(r1 * 0.7, r1 * 0.6);
        ctx.lineTo(r1 * 0.2, r1 * 0.9);
        ctx.lineTo(-r1 * 0.6, r1 * 0.8);
        ctx.lineTo(-r1 * 0.9, r1 * 0.2);
        ctx.lineTo(-r1 * 0.7, -r1 * 0.7);
        ctx.lineTo(0, -r1 * 0.9);
        ctx.lineTo(r1 * 0.8, -r1 * 0.5);
        ctx.closePath();

        const grad = ctx.createLinearGradient(-r1, -r1, r1, r1);
        grad.addColorStop(0, '#78716C');
        grad.addColorStop(0.5, '#44403C');
        grad.addColorStop(1, '#1C1917');
        ctx.fillStyle = grad;
        ctx.shadowColor = '#F97316';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.strokeStyle = 'rgba(251, 146, 60, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeObject]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
