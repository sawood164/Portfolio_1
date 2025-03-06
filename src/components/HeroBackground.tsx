"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
  twinkleSpeed: number;
  hue: number;
}

const HeroBackground: React.FC = () => {
  const scrollY = useScrollAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    // Enhanced canvas resize with better pixel ratio handling
    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    // Enhanced star creation with more realistic properties
    const createStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 1500); // More stars

      for (let i = 0; i < numStars; i++) {
        const hue = Math.random() * 60 + 200; // Blue to purple range
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 2000, // Increased depth
          size: Math.random() * 2.5 + 0.5, // Larger size range
          color: `hsl(${hue}, 80%, 80%)`,
          speed: Math.random() * 3 + 0.5, // Increased speed variation
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 0.1 + 0.01,
          hue: hue,
        });
      }
    };

    // Enhanced animation loop with more dynamic effects
    const animate = () => {
      time += 0.001;
      ctx.fillStyle = "rgba(17, 24, 39, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const parallaxOffset = scrollY * 0.8;

      // Draw stars with enhanced effects
      stars.forEach((star) => {
        star.z -= star.speed;
        const parallaxY = star.y + parallaxOffset * (star.z / 2000);

        if (star.z <= 0) {
          star.z = 2000;
          star.x = Math.random() * canvas.width - centerX;
          star.y = Math.random() * canvas.height - centerY;
        }

        const perspective = 500;
        const scale = perspective / (perspective + star.z);
        const x2d = star.x * scale + centerX;
        const y2d = parallaxY * scale + centerY;

        // Enhanced mouse interaction
        const dx = x2d - mouseX;
        const dy = y2d - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        const influence = Math.max(0, 1 - dist / maxDist);

        // Dynamic star properties
        const size = star.size * scale * (1 + influence);
        const baseOpacity = star.opacity * (1 - star.z / 2000);
        const twinkle = Math.sin(time * 50 * star.twinkleSpeed) * 0.3 + 0.7;
        const opacity = baseOpacity * twinkle;

        // Simple star rendering without glow
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 80%, 80%, ${opacity})`;
        ctx.fill();

        // Draw star trail
        if (star.speed > 2) {
          ctx.beginPath();
          ctx.moveTo(x2d, y2d);
          ctx.lineTo(x2d - dx * scale * 0.2, y2d - dy * scale * 0.2);
          ctx.strokeStyle = `hsla(${star.hue}, 80%, 80%, ${opacity * 0.3})`;
          ctx.lineWidth = size * 0.5;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    // Initialize
    handleResize();
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollY]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Space background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full bg-gray-900"
      />

      {/* Enhanced noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
    </div>
  );
};

export default HeroBackground;
