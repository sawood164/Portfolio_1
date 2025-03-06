"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  distance?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className = "",
  distance = 50,
}) => {
  const getInitialDirection = () => {
    switch (direction) {
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getInitialDirection(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: duration,
        delay: delay,
      },
    },
  };

  // Glow effect variants with proper typing
  const glowVariants: Variants = {
    hidden: {
      filter: "blur(10px)",
      textShadow: "0 0 0px rgba(0,234,255,0)",
    },
    visible: {
      filter: "blur(0px)",
      textShadow: "0 0 20px rgba(0,234,255,0.5)",
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        delay: delay,
        textShadow: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "linear",
          values: [
            "0 0 10px rgba(0,234,255,0.5)",
            "0 0 20px rgba(0,234,255,0.3)",
            "0 0 10px rgba(0,234,255,0.5)",
          ],
        },
      },
    },
  };

  return (
    <motion.div
      className={`relative ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
    >
      {/* Glow effect overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={glowVariants}
      />
      {children}
    </motion.div>
  );
};
