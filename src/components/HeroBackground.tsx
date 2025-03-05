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

    // Set canvas size with pixel ratio
    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    // Create stars
    const createStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 2000);

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1500,
          size: Math.random() * 2 + 0.5,
          color: `hsl(${Math.random() * 60 + 200}, 80%, 80%)`,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
        });
      }
    };

    // Draw nebula effect
    const drawNebula = (
      x: number,
      y: number,
      radius: number,
      color: string
    ) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `${color}33`);
      gradient.addColorStop(0.5, `${color}11`);
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(17, 24, 39, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const parallaxOffset = scrollY * 0.5; // Parallax effect intensity

      stars.forEach((star) => {
        // Update star position with parallax
        star.z -= star.speed;
        const parallaxY = star.y + parallaxOffset * (star.z / 1500);

        if (star.z <= 0) {
          star.z = 1500;
          star.x = Math.random() * canvas.width - centerX;
          star.y = Math.random() * canvas.height - centerY;
        }

        // Project with parallax
        const perspective = 300;
        const scale = perspective / (perspective + star.z);
        const x2d = star.x * scale + centerX;
        const y2d = parallaxY * scale + centerY;

        // Mouse interaction
        const dx = x2d - mouseX;
        const dy = y2d - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100;
        const influence = Math.max(0, 1 - dist / maxDist);

        // Draw star
        const size = star.size * scale * (1 + influence);
        const opacity = star.opacity * (1 - star.z / 1500);

        // Star trail effect
        ctx.beginPath();
        ctx.moveTo(x2d, y2d);
        ctx.lineTo(x2d + dx * scale * 0.1, y2d + dy * scale * 0.1);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
        ctx.lineWidth = size * 0.5;
        ctx.stroke();

        // Star
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      // Update nebula positions with parallax
      const time = Date.now() * 0.001;
      const parallaxNebula = scrollY * 0.2;

      drawNebula(
        centerX + Math.cos(time * 0.3) * 100,
        centerY + Math.sin(time * 0.2) * 100 - parallaxNebula,
        200,
        "#4A90E2"
      );
      drawNebula(
        centerX + Math.cos(time * 0.2 + 2) * 150,
        centerY + Math.sin(time * 0.3 + 1) * 150 - parallaxNebula * 1.2,
        250,
        "#904ED9"
      );

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

      {/* Overlay gradient */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, rgba(74, 144, 226, 0.3) 0%, rgba(17, 24, 39, 0) 70%)",
            "radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.3) 0%, rgba(17, 24, 39, 0) 70%)",
            "radial-gradient(circle at 30% 70%, rgba(74, 144, 226, 0.3) 0%, rgba(17, 24, 39, 0) 70%)",
          ],
        }}
        style={{
          transform: `translateY(${scrollY * 0.1}px)`, // Smooth parallax effect
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />
    </div>
  );
};

export default HeroBackground;
