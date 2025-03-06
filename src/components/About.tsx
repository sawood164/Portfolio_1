"use client";

import React from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { AnimatedText } from "./AnimatedText";
import { Icon } from "./ui/Icon";
import { Code, Lightbulb, Users, Zap, GraduationCap } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import Hero from "@/components/Hero";

const FloatingOrb: React.FC<{ delay: number; size: number; color: string }> = ({
  delay,
  size,
  color,
}) => {
  return (
    <motion.div
      className="absolute rounded-full opacity-20 pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
        filter: "blur(40px)",
      }}
      animate={{
        y: [-20, 20, -20],
        x: [-20, 20, -20],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const About: React.FC = () => {
  const { rotateX, rotateY } = useParallax({ intensity: 10 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description:
        "Writing maintainable and scalable code following best practices",
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description:
        "Analytical approach to solving complex technical challenges",
    },
    {
      icon: Users,
      title: "Team Player",
      description: "Excellent collaboration and communication skills",
    },
    {
      icon: Zap,
      title: "Fast Learner",
      description: "Quick to adapt and learn new technologies",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 px-4 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <FloatingOrb delay={0} size={300} color="#4F46E5" />
        <FloatingOrb delay={2} size={400} color="#7C3AED" />
        <FloatingOrb delay={4} size={350} color="#00eaff" />
      </div>

      <div className="container-width relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              About Me
            </h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 max-w-3xl mx-auto font-light tracking-wide px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              A passionate Full Stack Developer skilled in crafting dynamic web
              applications and solving complex challenges with innovative
              solutions.
            </motion.p>
          </motion.div>

          {/* Profile Image */}
          <ScrollReveal delay={0.2}>
            <motion.div
              className="relative group w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] mx-auto mb-12 sm:mb-16"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/images/your-photo.jpg"
                  alt=""
                  fill
                  className="rounded-2xl object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 400px"
                />

                {/* Enhanced Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                  animate={{
                    background: [
                      "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,234,255,0.2), transparent)",
                      "linear-gradient(to top, rgba(0,0,0,0.8), rgba(106,13,173,0.2), transparent)",
                      "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,234,255,0.2), transparent)",
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Enhanced glow effects */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-[#00eaff]/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-28 sm:w-32 md:w-40 h-28 sm:h-32 md:h-40 bg-[#6a0dad]/20 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  delay: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </ScrollReveal>

          {/* Education Section */}
          <ScrollReveal delay={0.6}>
            <motion.div
              className="mt-16 mb-16 relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-800/50 backdrop-blur-xl border border-gray-700/30 max-w-3xl mx-auto w-full"
              whileHover={{ scale: 1.01 }}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md transform group-hover:scale-110 transition-transform duration-300" />
                  <div className="relative rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4">
                    <GraduationCap className="w-7 h-7 text-[#00eaff]" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Education
                </h3>
              </div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative pl-8 border-l-2 border-[#00eaff]/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#00eaff] opacity-30 blur-sm" />
                  <div className="absolute -left-[7px] top-[2px] w-3 h-3 rounded-full bg-[#00eaff]" />

                  <h4 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                    VIT Bhopal University
                  </h4>
                  <p className="text-base sm:text-lg text-gray-300 mb-2">
                    Bachelor of Engineering in Computer Science and Engineering
                  </p>
                  <p className="text-base sm:text-lg text-gray-400 mb-4 italic">
                    Specialization in Cloud Computing and Automation
                  </p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <span className="text-sm sm:text-base text-gray-400">
                      2021 – 2025
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-[#00eaff]/10 text-[#00eaff] text-sm sm:text-base font-medium border border-[#00eaff]/20">
                      CGPA: 8.13
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-2 -left-2 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            </motion.div>
          </ScrollReveal>

          {/* Highlights Grid */}
          <ScrollReveal delay={0.4}>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="group relative p-4 sm:p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-[#00eaff]/30 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 0 20px rgba(0,234,255,0.2)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background:
                        "radial-gradient(circle at center, #00eaff, transparent)",
                      filter: "blur(20px)",
                    }}
                  />

                  <div className="relative flex flex-col items-center text-center">
                    <Icon
                      icon={item.icon}
                      className="text-[#00eaff] mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-[#6a0dad]"
                      size={28}
                    />
                    <AnimatedText
                      text={item.title}
                      className="font-semibold text-white mb-2"
                      delay={index * 0.1}
                    />
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
