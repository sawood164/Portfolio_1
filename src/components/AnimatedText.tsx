"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  gradient?: boolean;
  delay?: number;
  duration?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  gradient = false,
  delay = 0,
  duration = 0.5,
}) => {
  // Split text into words
  const words = text.split(" ");

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  };

  const glowAnimation = {
    initial: {
      textShadow: "0 0 0px #00eaff",
    },
    animate: {
      textShadow: [
        "0 0 10px #00eaff",
        "0 0 20px #00eaff",
        "0 0 30px #00eaff",
        "0 0 20px #00eaff",
        "0 0 10px #00eaff",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.span
        className={`inline-block ${className} ${
          gradient
            ? "bg-gradient-to-r from-[#00eaff] to-[#6a0dad] bg-clip-text text-transparent"
            : ""
        }`}
        variants={glowAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {words.map((word, index) => (
          <motion.span key={index} className="inline-block" variants={child}>
            {word}
            {index !== words.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </motion.span>
    </motion.div>
  );
};
