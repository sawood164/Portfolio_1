"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface IconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  variant?: "default" | "glow" | "spin" | "bounce" | "pulse";
  animated?: boolean;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 24,
  className = "",
  variant = "default",
  animated = true,
  color,
}) => {
  const getAnimationProps = () => {
    if (!animated) return {};

    switch (variant) {
      case "glow":
        return {
          whileHover: {
            scale: 1.1,
            filter: [
              "drop-shadow(0 0 4px currentColor)",
              "drop-shadow(0 0 8px currentColor)",
            ],
          },
          transition: {
            filter: {
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
            },
            scale: {
              type: "spring",
              stiffness: 400,
              damping: 10,
            },
          },
        };
      case "spin":
        return {
          animate: {
            rotate: 360,
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          },
        };
      case "bounce":
        return {
          animate: {
            y: [0, -8, 0],
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "pulse":
        return {
          animate: {
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      default:
        return {
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.9 },
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 17,
          },
        };
    }
  };

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      {...getAnimationProps()}
      style={{ color }}
    >
      <IconComponent size={size} />
    </motion.div>
  );
};
