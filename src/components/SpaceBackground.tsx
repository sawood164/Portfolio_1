"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";

// Optimize star generation with useMemo
const Star: React.FC<{ x: number; y: number; size: number; delay: number }> = ({
  x,
  y,
  size,
  delay,
}) => {
  // Convert size to pixels and ensure it's a string with 'px'
  const sizeInPx = `${size}px`;

  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        width: sizeInPx,
        height: sizeInPx,
        left: `${x}%`,
        top: `${y}%`,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 0.5, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Optimize nebula rendering
const Nebula: React.FC<{ color: string; position: string }> = ({
  color,
  position,
}) => {
  const style = useMemo(
    () => ({
      background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
      filter: "blur(40px)",
      opacity: 0.1,
      ...getPositionStyle(position),
    }),
    [color, position]
  );

  return <div className="absolute w-[40vw] h-[40vw]" style={style} />;
};

const getPositionStyle = (position: string) => {
  switch (position) {
    case "top-left":
      return { top: "10%", left: "10%" };
    case "top-right":
      return { top: "10%", right: "10%" };
    case "bottom-left":
      return { bottom: "10%", left: "10%" };
    case "bottom-right":
      return { bottom: "10%", right: "10%" };
    default:
      return {};
  }
};

const ShootingStar: React.FC<{ delay: number }> = ({ delay }) => {
  const randomTop = Math.random() * 50;
  const randomLeft = Math.random() * 100;
  const randomRotate = -45 + Math.random() * 20;

  return (
    <motion.div
      className="absolute h-[2px]"
      style={{
        top: `${randomTop}%`,
        left: `${randomLeft}%`,
        transform: `rotate(${randomRotate}deg)`,
      }}
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: ["0px", "200px", "0px"],
        opacity: [0, 1, 0],
        x: ["0%", "200%"],
      }}
      transition={{
        duration: 1,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 7 + 5,
      }}
    >
      <div className="w-full h-full bg-gradient-to-r from-transparent via-[#00eaff] to-transparent" />
      <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-[#00eaff] blur-sm" />
    </motion.div>
  );
};

const Constellation: React.FC = () => {
  const points = [
    { x: 20, y: 20 },
    { x: 30, y: 35 },
    { x: 40, y: 25 },
    { x: 60, y: 40 },
    { x: 80, y: 30 },
  ];

  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full">
        <motion.path
          d={`M ${points.map((p) => `${p.x}% ${p.y}%`).join(" L ")}`}
          stroke="rgba(0, 234, 255, 0.2)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
      {points.map((point, i) => (
        <Star key={i} x={point.x} y={point.y} size={2} delay={i * 0.5} />
      ))}
    </div>
  );
};

const Planet: React.FC<{
  size: number;
  orbitRadius: number;
  speed: number;
  rotationSpeed: number;
  color: string;
  hasRings?: boolean;
  position?: { x: number; y: number };
}> = ({
  size,
  orbitRadius,
  speed,
  rotationSpeed,
  color,
  hasRings,
  position,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        left: position?.x ?? "50%",
        top: position?.y ?? "50%",
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.div
        className="relative"
        style={{
          x: orbitRadius,
        }}
        whileHover={{ scale: 1.1, z: 50 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Planet Body */}
        <motion.div
          className="relative rounded-full overflow-hidden cursor-pointer"
          style={{
            width: size,
            height: size,
            background: `linear-gradient(45deg, ${color}, ${adjustColor(
              color,
              -20
            )})`,
            boxShadow: `
              inset -${size / 4}px -${size / 4}px ${size / 2}px rgba(0,0,0,0.5),
              0 0 ${size / 2}px ${adjustColor(color, 20)},
              0 0 ${size}px rgba(0,0,0,0.5)
            `,
          }}
          animate={{
            rotate: 360,
            scale: isHovered ? 1.1 : 1,
            z: isHovered ? 50 : 0,
          }}
          transition={{
            rotate: {
              duration: rotationSpeed,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 0.3,
            },
          }}
        >
          {/* Surface Details */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.5) 100%),
                radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)
              `,
            }}
          />
        </motion.div>

        {/* Planet Rings */}
        {hasRings && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: size * 2,
              height: size * 0.8,
              border: `${size / 20}px solid rgba(255,255,255,0.1)`,
              borderRadius: "50%",
              transform: "rotateX(75deg)",
              boxShadow: `
                0 0 ${size / 4}px rgba(255,255,255,0.1),
                inset 0 0 ${size / 4}px rgba(255,255,255,0.1)
              `,
            }}
            animate={{
              rotate: 360,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              rotate: {
                duration: rotationSpeed * 2,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 0.3,
              },
            }}
          />
        )}

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${color}00, ${color}40)`,
            filter: "blur(20px)",
          }}
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Helper function to adjust color brightness
const adjustColor = (color: string, amount: number) => {
  const hex = color.replace("#", "");
  const r = Math.max(
    Math.min(parseInt(hex.substring(0, 2), 16) + amount, 255),
    0
  );
  const g = Math.max(
    Math.min(parseInt(hex.substring(2, 4), 16) + amount, 255),
    0
  );
  const b = Math.max(
    Math.min(parseInt(hex.substring(4, 6), 16) + amount, 255),
    0
  );
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const SpaceBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  // Generate stars with consistent number formatting
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      size: Math.floor(Math.random() * 2 + 1),
      delay: Math.floor(Math.random() * 3),
    }));
  }, []);

  const shootingStars = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => (
        <ShootingStar key={i} delay={Math.random() * 5} />
      )),
    []
  );

  // Only render planets when window size is available
  const renderPlanets = windowWidth > 0 && windowHeight > 0;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden perspective-1000">
      {/* Base dark space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-[#0a192f] to-[#0a192f]" />

      {/* Stars with consistent number formatting */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0">
        {stars.map((star, i) => (
          <Star
            key={i}
            x={star.x}
            y={star.y}
            size={star.size}
            delay={star.delay}
          />
        ))}
      </motion.div>

      {/* Constellations */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <Constellation />
      </motion.div>

      {/* Shooting stars */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {shootingStars}
      </motion.div>

      {/* Enhanced Planets Layer */}
      {renderPlanets && (
        <motion.div style={{ y: y1 }} className="absolute inset-0">
          <Planet
            size={120}
            orbitRadius={300}
            speed={40}
            rotationSpeed={20}
            color="#4F46E5"
            hasRings={true}
            position={{ x: windowWidth * 0.7, y: windowHeight * 0.3 }}
          />
          <Planet
            size={80}
            orbitRadius={200}
            speed={30}
            rotationSpeed={15}
            color="#7C3AED"
            position={{ x: windowWidth * 0.3, y: windowHeight * 0.6 }}
          />
          <Planet
            size={60}
            orbitRadius={150}
            speed={25}
            rotationSpeed={10}
            color="#00eaff"
            hasRings={true}
            position={{ x: windowWidth * 0.8, y: windowHeight * 0.7 }}
          />
        </motion.div>
      )}

      {/* Optimized nebula clouds */}
      <div className="absolute inset-0">
        <Nebula color="rgba(106, 13, 173, 0.3)" position="top-left" />
        <Nebula color="rgba(0, 234, 255, 0.3)" position="top-right" />
        <Nebula color="rgba(79, 70, 229, 0.3)" position="bottom-left" />
      </div>

      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a192f]/50 to-[#0a192f]/80" />
    </div>
  );
};
