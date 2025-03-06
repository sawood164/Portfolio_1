"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { SolarSystem } from "./SolarSystem";
import { AnimatedText } from "./AnimatedText";
import { ArrowDown, Github, Linkedin, Mail, Instagram } from "lucide-react";
import HeroBackground from "./HeroBackground";

// 3D Floating Orb Effect
const FloatingOrb: React.FC<{ delay: number; size: number; color: string }> = ({
  delay,
  size,
  color,
}) => {
  const y = useMotionValue(0);
  const rotate = useTransform(y, [-100, 100], [-45, 45]);

  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        y,
        rotate,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -50, 0],
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 10 + Math.random() * 5,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
          filter: "blur(20px)",
          transform: "perspective(1000px) rotateX(45deg)",
        }}
      />
    </motion.div>
  );
};

// Enhanced Cosmic Trail
const CosmicTrail: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    className="absolute w-[4px] h-[4px]"
    style={{
      background: "linear-gradient(to right, #00eaff, #6a0dad)",
      borderRadius: "50%",
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      filter: "blur(2px)",
      boxShadow: "0 0 20px rgba(0,234,255,0.5)",
    }}
    animate={{
      scale: [0, 2, 0],
      opacity: [0, 0.8, 0],
      x: [0, Math.random() * 400 - 200],
      y: [0, Math.random() * 400 - 200],
      rotate: [0, 360],
    }}
    transition={{
      duration: 5 + Math.random() * 3,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  />
);

// Enhanced Moon Crater Component
const MoonCrater: React.FC<{
  size: number;
  position: { x: number; y: number };
}> = ({ size, position }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: `${position.x}%`,
      top: `${position.y}%`,
      background:
        "radial-gradient(circle at 40% 40%, rgba(160,160,160,0.4), rgba(80,80,80,0.8))",
      boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.4)",
      transform: "translateZ(-2px)",
    }}
  />
);

// Optimize MilkyWay component by removing heavy animations
const MilkyWay: React.FC = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at center,
            rgba(103, 232, 249, 0.6) 0%,
            rgba(147, 197, 253, 0.2) 15%,
            rgba(167, 139, 250, 0.1) 25%,
            transparent 70%
          )
        `,
        filter: "blur(30px)",
        transform: "translateZ(0)",
      }}
    />
  );
};

// Simplified StarField with static stars
const StarField: React.FC = () => (
  <div className="absolute inset-0">
    {Array.from({ length: 30 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-[2px] h-[2px] bg-white rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.7 + 0.3,
        }}
      />
    ))}
  </div>
);

// Optimized Falling Star
const FallingStar: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    className="absolute w-[3px] h-[3px]"
    style={{
      left: `${Math.random() * 100}%`,
      top: "-5%",
    }}
    animate={{
      y: ["0%", "105%"],
      x: ["0%", "-20%"],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 1,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <div
      className="w-full h-full relative"
      style={{
        background: "#fff",
        boxShadow: "0 0 20px #fff, 0 0 40px #00eaff",
      }}
    >
      <div
        className="absolute top-0 -right-[100px] w-[100px] h-full"
        style={{
          background: "linear-gradient(to left, transparent, #fff)",
          opacity: 0.6,
        }}
      />
    </div>
  </motion.div>
);

// Optimize SpacePlanets component
const SpacePlanets: React.FC = () => {
  const planets = [
    {
      name: "blueGiant",
      size: 180,
      position: { x: 80, y: 15 },
      colors: ["#67e8f9", "#3b82f6", "#1d4ed8"],
      hasRings: false,
      hasAtmosphere: true,
      rotationSpeed: 25,
    },
    {
      name: "purpleNebula",
      size: 140,
      position: { x: 15, y: 65 },
      colors: ["#c084fc", "#7c3aed", "#4c1d95"],
      hasRings: true,
      hasAtmosphere: true,
      rotationSpeed: 30,
    },
    {
      name: "redDwarf",
      size: 100,
      position: { x: 85, y: 75 },
      colors: ["#f87171", "#dc2626", "#991b1b"],
      hasRings: false,
      hasAtmosphere: true,
      rotationSpeed: 20,
    },
    {
      name: "emeraldGiant",
      size: 160,
      position: { x: 25, y: 25 },
      colors: ["#6ee7b7", "#059669", "#065f46"],
      hasRings: true,
      hasAtmosphere: true,
      rotationSpeed: 35,
    },
  ];

  return (
    <>
      {planets.map((planet, index) => (
        <motion.div
          key={planet.name}
          className="absolute"
          style={{
            width: planet.size,
            height: planet.size,
            left: `${planet.position.x}%`,
            top: `${planet.position.y}%`,
            perspective: 1000,
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitPerspective: 1000,
            WebkitBackfaceVisibility: "hidden",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: index * 0.3,
            restSpeed: 0.5,
            restDelta: 0.01,
          }}
        >
          {/* Planet Body with optimized animations */}
          <motion.div
            className="relative w-full h-full rounded-full"
            style={{
              background: `
                radial-gradient(circle at 30% 30%,
                  ${planet.colors[0]} 0%,
                  ${planet.colors[1]} 50%,
                  ${planet.colors[2]} 100%
                )
              `,
              boxShadow: `
                inset -10px -10px 50px rgba(0,0,0,0.5),
                inset 10px 10px 50px rgba(255,255,255,0.3),
                0 0 50px ${planet.colors[0]}40
              `,
              willChange: "transform",
              transform: "translateZ(0)",
              WebkitPerspective: 1000,
              WebkitBackfaceVisibility: "hidden",
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: planet.rotationSpeed,
              repeat: Infinity,
              ease: "linear",
              restSpeed: 0.5,
              restDelta: 0.01,
            }}
          >
            {/* Atmospheric Effect */}
            {planet.hasAtmosphere && (
              <motion.div
                className="absolute -inset-4 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle at center, ${planet.colors[0]}40, transparent 70%)`,
                  filter: "blur(8px)",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Surface Details */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${20 + Math.random() * 40}%`,
                  height: `${5 + Math.random() * 10}%`,
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 80}%`,
                  background: `linear-gradient(90deg, 
                    ${planet.colors[1]}40,
                    ${planet.colors[2]}40
                  )`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: 0.3,
                }}
              />
            ))}
          </motion.div>

          {/* Rings System */}
          {planet.hasRings && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: planet.size * 1.8,
                height: planet.size * 0.4,
                perspective: 1000,
              }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(90deg,
                        transparent,
                        ${planet.colors[i]}40 20%,
                        ${planet.colors[i]}60 50%,
                        ${planet.colors[i]}40 80%,
                        transparent
                      )
                    `,
                    borderRadius: "50%",
                    transform: `rotateX(75deg) translateY(${i * 4}px)`,
                    opacity: 0.5 - i * 0.1,
                  }}
                  animate={{
                    rotateZ: [0, 360],
                  }}
                  transition={{
                    duration: planet.rotationSpeed * (1.5 + i * 0.5),
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      ))}
    </>
  );
};

// Update SpaceBackground
const SpaceBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#020617]"
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      <MilkyWay />
      <SpacePlanets />

      {/* Optimized Falling Stars */}
      {Array.from({ length: 6 }).map((_, i) => (
        <FallingStar key={i} delay={i * 2.5} />
      ))}

      {/* Optimized Nebula Effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 75% 20%, rgba(103, 232, 249, 0.15), transparent 50%),
            radial-gradient(circle at 25% 60%, rgba(167, 139, 250, 0.15), transparent 50%),
            radial-gradient(circle at 50% 40%, rgba(139, 92, 246, 0.1), transparent 60%)
          `,
          filter: "blur(40px)",
          willChange: "opacity",
          transform: "translateZ(0)",
        }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          restSpeed: 0.1,
          restDelta: 0.001,
        }}
      />
    </div>
  );
};

// Ultra-fast SocialLink with instant hover
const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-5 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5 hover:border-[#00eaff]/30 flex items-center justify-center relative group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{
      type: "spring",
      stiffness: 1000,
      damping: 10,
      mass: 0.1,
      velocity: 100,
    }}
  >
    {React.cloneElement(icon as React.ReactElement, {
      className:
        "w-8 h-8 text-white/70 group-hover:text-[#00eaff] transition-none",
    })}
    <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-sm text-[#00eaff]/70 tracking-wider whitespace-nowrap transition-none">
      {label}
    </span>
  </motion.a>
);

// Enhanced ScrollIndicator
const ScrollIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed bottom-12 right-12 flex flex-col items-center gap-3 mix-blend-difference"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <motion.div
        className="h-24 w-[3px] rounded-full overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,234,255,0.5))",
        }}
      >
        <motion.div
          className="w-full bg-[#00eaff]"
          style={{
            height: "100%",
            scaleY: scrollYProgress,
            transformOrigin: "top",
          }}
        />
      </motion.div>
      <motion.div
        animate={{
          y: [0, 8, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ArrowDown className="w-6 h-6 text-[#00eaff]" />
      </motion.div>
    </motion.div>
  );
};

// Add this to your global CSS or tailwind config
const styles = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  .animate-twinkle {
    animation: twinkle 2s ease-in-out infinite;
  }
`;

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617] antialiased px-4 sm:px-6 lg:px-8"
      style={{
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        WebkitTransform: "translate3d(0,0,0)",
        WebkitBackfaceVisibility: "hidden",
        WebkitFontSmoothing: "subpixel-antialiased",
        isolation: "isolate",
      }}
    >
      <HeroBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-8 sm:space-y-12 lg:space-y-16">
          <motion.div
            className="text-center w-full px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.a
              href="/Resume-Sawood-2.pdf"
              download="Sawood_Resume.pdf"
              className="group px-6 sm:px-8 py-2.5 sm:py-3 mb-6 sm:mb-8 rounded-full bg-black/30 text-[#00eaff] text-base sm:text-lg font-light tracking-wider inline-flex items-center gap-2 backdrop-blur-sm border border-[#00eaff]/20 hover:bg-[#00eaff]/10 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 1000,
                damping: 10,
                mass: 0.1,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-[#00eaff]/10 translate-y-full"
                initial={false}
                animate={{ translateY: "100%" }}
                whileHover={{ translateY: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-y-0.5 transition-transform sm:w-5 sm:h-5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="hidden sm:inline">DOWNLOAD</span> RESUME
            </motion.a>

            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold max-w-full break-words"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.8), rgba(0,234,255,0.9), rgba(255,255,255,0.8))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textShadow: "0 0 30px rgba(0,234,255,0.2)",
                transform: "translate3d(0,0,0)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              MD SAWOOD ALAM
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] text-white/70 mt-4 sm:mt-6"
              style={{ transform: "translate3d(0,0,0)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              FULL STACK DEVELOPER
            </motion.p>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 flex-wrap px-2 sm:px-4"
            style={{ transform: "translate3d(0,0,0)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SocialLink
              href="https://github.com/sawood164"
              icon={<Github className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />}
              label="GITHUB"
            />
            <SocialLink
              href="https://www.linkedin.com/in/md-sawood-alam-614884257/"
              icon={
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              }
              label="LINKEDIN"
            />
            <SocialLink
              href="mailto:sawoodalam19@gmail.com"
              icon={<Mail className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />}
              label="EMAIL"
            />
            <SocialLink
              href="https://www.instagram.com/sawood_alam_19/profilecard"
              icon={
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              }
              label="INSTAGRAM"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 flex flex-col items-center gap-2 sm:gap-3 mix-blend-difference"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="h-16 sm:h-24 w-[2px] sm:w-[3px] rounded-full overflow-hidden bg-gradient-to-b from-transparent via-[#00eaff]/50 to-[#00eaff]"
          style={{
            boxShadow: "0 0 20px rgba(0,234,255,0.3)",
          }}
        >
          <motion.div
            className="w-full bg-[#00eaff]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              height: "100%",
              transformOrigin: "top",
            }}
          />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown className="w-4 h-4 sm:w-6 sm:h-6 text-[#00eaff]" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
