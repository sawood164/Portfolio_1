"use client";

import React, { useMemo, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { Icon } from "./ui/Icon";
import { useParallax } from "@/hooks/useParallax";
import {
  SiReact,
  SiCplusplus,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiPython,
  SiDocker,
  SiGit,
  SiAmazon,
  SiFirebase,
  SiSupabase,
  SiFlutter,
} from "react-icons/si";

interface Technology {
  name: string;
  Icon: React.ElementType;
  level: number;
  color: string;
  description: string;
}

const technologies: Technology[] = [
  {
    name: "React",
    Icon: SiReact,
    level: 90,
    color: "#61DAFB",
    description:
      "Advanced proficiency in React, including Hooks, Context, and Redux",
  },
  {
    name: "Flutter",
    Icon: SiFlutter,
    level: 85,
    color: "#02569B",
    description: "Cross-platform mobile app development with Flutter and Dart",
  },
  {
    name: "C++",
    Icon: SiCplusplus,
    level: 85,
    color: "#00599C",
    description: "Object-oriented programming and data structures",
  },
  {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
    level: 90,
    color: "#38B2AC",
    description: "Extensive experience with responsive and custom designs",
  },
  {
    name: "SQL",
    Icon: SiPostgresql,
    level: 85,
    color: "#336791",
    description: "Database design, complex queries, and optimization",
  },
  {
    name: "MongoDB",
    Icon: SiMongodb,
    level: 75,
    color: "#47A248",
    description: "Database design and aggregation pipelines",
  },
  {
    name: "Python",
    Icon: SiPython,
    level: 70,
    color: "#3776AB",
    description: "Scripting and data processing applications",
  },
  {
    name: "Docker",
    Icon: SiDocker,
    level: 65,
    color: "#2496ED",
    description: "Containerization and deployment workflows",
  },
  {
    name: "Git",
    Icon: SiGit,
    level: 85,
    color: "#F05032",
    description: "Version control and collaborative development",
  },
  {
    name: "AWS",
    Icon: SiAmazon,
    level: 70,
    color: "#FF9900",
    description: "Cloud infrastructure and serverless functions",
  },
  {
    name: "Firebase",
    Icon: SiFirebase,
    level: 80,
    color: "#FFCA28",
    description: "Real-time databases and authentication",
  },
  {
    name: "Supabase",
    Icon: SiSupabase,
    level: 80,
    color: "#3ECF8E",
    description: "Open source Firebase alternative with PostgreSQL",
  },
];

const FloatingTechOrb: React.FC<{
  delay: number;
  size: number;
  color: string;
  x: string;
  y: string;
}> = ({ delay, size, color, x, y }) => {
  return (
    <motion.div
      className="absolute rounded-full opacity-10 pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
        filter: "blur(40px)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const TechCard: React.FC<{
  icon: any;
  name: string;
  description: string;
  color: string;
  delay: number;
}> = ({ icon, name, description, color, delay }) => {
  // Memoize styles for better performance
  const glowStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at center, ${color}, transparent)`,
      filter: "blur(20px)",
    }),
    [color]
  );

  const iconGlowStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at center, ${color}40, transparent)`,
      filter: "blur(10px)",
    }),
    [color]
  );

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        className="relative p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={glowStyle}
        />

        <div className="relative flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <Icon
              icon={icon}
              size={40}
              className="text-gray-300 transition-colors duration-300 group-hover:text-white"
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={iconGlowStyle}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TechStack: React.FC = () => {
  const { rotateX, rotateY } = useParallax({ intensity: 5 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Throttle mouse move handler
  const handleMouseMove = useMemo(() => {
    let timeout: NodeJS.Timeout;
    return (e: React.MouseEvent) => {
      if (!sectionRef.current || timeout) return;

      timeout = setTimeout(() => {
        try {
          const rect = sectionRef.current?.getBoundingClientRect();
          if (rect) {
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            mouseX.set(x);
            mouseY.set(y);
          }
        } catch (error) {
          console.error("Error calculating mouse position:", error);
        }
        timeout = null as any;
      }, 50);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative min-h-screen pt-24 pb-20 px-4 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Section-specific background effects */}
      <div className="absolute inset-0 -z-10">
        <FloatingTechOrb delay={0} size={400} color="#4F46E5" x="10%" y="20%" />
        <FloatingTechOrb delay={1} size={300} color="#7C3AED" x="80%" y="30%" />
        <FloatingTechOrb delay={2} size={350} color="#00eaff" x="60%" y="70%" />
        <FloatingTechOrb delay={3} size={250} color="#6366F1" x="20%" y="60%" />
      </div>

      <div className="container-width">
        <ScrollReveal>
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.h2
              className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Tech Stack
            </motion.h2>
            <p className="text-xl text-gray-400">
              Technologies I work with to bring ideas to life
            </p>
          </motion.div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {technologies.map((tech, index) => (
            <TechCard
              key={tech.name}
              icon={tech.Icon}
              name={tech.name}
              description={tech.description}
              color={tech.color}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
