"use client";

import React from "react";
import { motion } from "framer-motion";

const Planet: React.FC<{
  size: number;
  orbitSize: number;
  speed: number;
  color: string;
  delay?: number;
  hasRings?: boolean;
}> = ({ size, orbitSize, speed, color, delay = 0, hasRings }) => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: orbitSize,
        height: orbitSize,
        rotate: delay * 45,
      }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
        delay: delay,
      }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, ${color}, rgba(0,0,0,0.8))`,
          boxShadow: `0 0 ${size / 2}px ${color}`,
          left: "calc(100% - ${size/2}px)",
          top: "calc(50% - ${size/2}px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {hasRings && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: size * 1.5,
              height: size * 0.4,
              border: `${size / 20}px solid rgba(255,255,255,0.1)`,
              borderRadius: "50%",
              transform: "rotateX(75deg)",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: speed * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const Star: React.FC<{ delay: number }> = ({ delay }) => {
  const size = Math.random() * 2 + 1;
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        opacity: [0, 0.5, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

export const SolarSystem: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Star key={i} delay={Math.random() * 2} />
      ))}

      {/* Sun */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 100,
          height: 100,
          background: "radial-gradient(circle at 30% 30%, #ffd700, #ff4500)",
          borderRadius: "50%",
          boxShadow: "0 0 50px #ff4500, 0 0 100px #ff4500",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Planets */}
      <Planet size={20} orbitSize={200} speed={15} color="#00eaff" delay={0} />
      <Planet
        size={30}
        orbitSize={300}
        speed={20}
        color="#6a0dad"
        delay={1}
        hasRings
      />
      <Planet size={25} orbitSize={400} speed={25} color="#4F46E5" delay={2} />
      <Planet
        size={35}
        orbitSize={500}
        speed={30}
        color="#7C3AED"
        delay={3}
        hasRings
      />

      {/* Nebula Effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent, rgba(0,0,0,0.8))",
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
