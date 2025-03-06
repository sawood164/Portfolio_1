"use client";

import React from "react";
import { motion } from "framer-motion";

const GradientBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute h-[200%] w-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,#4A90E2_0%,#F7B801_120deg,#904ED9_240deg,#4A90E2_360deg)]"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          filter: "blur(100px)",
          opacity: 0.15,
          transform: "translate(-25%, -25%)",
        }}
      />
    </div>
  );
};

export default GradientBackground;
