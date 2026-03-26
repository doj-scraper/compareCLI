import { useEffect, useRef } from 'react';

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

const FireflyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firefliesRef = useRef<Firefly[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize fireflies
    const fireflyCount = Math.min(30, Math.floor(window.innerWidth / 50));
    firefliesRef.current = Array.from({ length: fireflyCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      firefliesRef.current.forEach((firefly) => {
        // Update position with gentle drift
        firefly.x += firefly.vx;
        firefly.y += firefly.vy;

        // Add slight random movement (Brownian motion)
        firefly.vx += (Math.random() - 0.5) * 0.02;
        firefly.vy += (Math.random() - 0.5) * 0.02;

        // Dampen velocity
        firefly.vx *= 0.99;
        firefly.vy *= 0.99;

        // Wrap around edges
        if (firefly.x < 0) firefly.x = canvas.width;
        if (firefly.x > canvas.width) firefly.x = 0;
        if (firefly.y < 0) firefly.y = canvas.height;
        if (firefly.y > canvas.height) firefly.y = 0;

        // Update pulse
        firefly.pulsePhase += firefly.pulseSpeed;
        const pulseOpacity = firefly.opacity * (0.6 + 0.4 * Math.sin(firefly.pulsePhase));

        // Draw firefly glow
        const gradient = ctx.createRadialGradient(
          firefly.x, firefly.y, 0,
          firefly.x, firefly.y, firefly.size * 4
        );
        gradient.addColorStop(0, `rgba(255, 215, 0, ${pulseOpacity})`);
        gradient.addColorStop(0.3, `rgba(255, 215, 0, ${pulseOpacity * 0.5})`);
        gradient.addColorStop(0.6, `rgba(255, 215, 0, ${pulseOpacity * 0.2})`);
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw firefly core
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 229, 92, ${pulseOpacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};

export default FireflyBackground;
