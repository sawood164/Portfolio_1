"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "tilt" | "lift" | "glow";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = "tilt",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation
  const mouseX = useSpring(x);
  const mouseY = useSpring(y);

  // Transform values for rotation and lifting
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getMotionProps = () => {
    switch (hoverEffect) {
      case "tilt":
        return {
          style: { rotateX, rotateY },
          initial: { scale: 1 },
          whileHover: { scale: 1.02 },
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
        };
      case "lift":
        return {
          initial: { scale: 1, y: 0 },
          whileHover: { scale: 1.05, y: -10 },
          transition: { type: "spring", stiffness: 400, damping: 17 },
        };
      case "glow":
        return {
          initial: {
            scale: 1,
            boxShadow: "0 0 0 rgba(74, 144, 226, 0)",
          },
          whileHover: {
            scale: 1.02,
            boxShadow: "0 10px 30px -10px rgba(74, 144, 226, 0.3)",
          },
          transition: { duration: 0.3 },
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`
        relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm
        border border-gray-700/50 transition-colors
        hover:bg-gray-800/70 hover:border-gray-600/50
        ${className}
      `}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: "1000px",
      }}
      {...getMotionProps()}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
