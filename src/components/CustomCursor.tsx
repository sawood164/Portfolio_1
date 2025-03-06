"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface ParticleProps {
  x: number;
  y: number;
  color: string;
}

const Particle: React.FC<ParticleProps> = ({ x, y, color }) => {
  return (
    <motion.div
      className="pointer-events-none absolute h-2 w-2 rounded-full"
      style={{
        x,
        y,
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
      }}
      initial={{ scale: 1, opacity: 0.8 }}
      animate={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
};

export const CustomCursor: React.FC = () => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring animation for cursor
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add particle with alternating colors
      if (Math.random() > 0.8) {
        const colors = ["#00eaff", "#6a0dad"]; // Cyan and Purple
        const newParticle = {
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        setParticles((prev) => [...prev.slice(-15), newParticle]);
      }
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);

    // Add hover detection to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button']"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleHoverStart);
      element.addEventListener("mouseleave", handleHoverEnd);

      // Enhanced magnetic effect with glow
      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );
        const maxDistance = 100;

        if (distance < maxDistance) {
          const pull = 0.3;
          const moveX = (distanceX / maxDistance) * rect.width * pull;
          const moveY = (distanceY / maxDistance) * rect.height * pull;
          (
            element as HTMLElement
          ).style.transform = `translate(${moveX}px, ${moveY}px)`;
          (element as HTMLElement).style.boxShadow =
            "0 0 20px #00eaff, 0 0 40px #6a0dad";
        } else {
          (element as HTMLElement).style.transform = "";
          (element as HTMLElement).style.boxShadow = "";
        }
      });

      element.addEventListener("mouseleave", () => {
        (element as HTMLElement).style.transform = "";
        (element as HTMLElement).style.boxShadow = "";
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleHoverStart);
        element.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Particles */}
      {particles.map((particle, i) => (
        <Particle key={i} {...particle} />
      ))}

      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <motion.div
          className="relative flex h-6 w-6 items-center justify-center"
          animate={{
            scale: isHovering ? 2 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Inner cursor */}
          <motion.div
            className="absolute h-full w-full rounded-full"
            style={{
              background: "radial-gradient(circle, #00eaff 0%, #6a0dad 100%)",
              boxShadow: "0 0 10px #00eaff, 0 0 20px #6a0dad",
            }}
            animate={{
              scale: isHovering ? 1.2 : 1,
            }}
          />

          {/* Pulsing ring */}
          <motion.div
            className="absolute h-full w-full rounded-full"
            style={{
              border: "2px solid #00eaff",
              boxShadow: "0 0 10px #00eaff",
            }}
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Outer glow */}
      <motion.div
        className="pointer-events-none fixed z-40"
        style={{
          x: smoothX,
          y: smoothY,
          width: "60px",
          height: "60px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,234,255,0.2) 0%, rgba(106,13,173,0.1) 50%, transparent 70%)",
            filter: "blur(8px)",
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
};
