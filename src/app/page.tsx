"use client";

import dynamic from "next/dynamic";
import { Suspense, lazy } from "react";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";

// Dynamic import SpaceBackground with no SSR
const SpaceBackground = dynamic(
  () =>
    import("@/components/SpaceBackground").then((mod) => mod.SpaceBackground),
  { ssr: false }
);

// Dynamic imports for code splitting
const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="h-screen bg-gray-900" />,
  ssr: false,
});

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="h-screen bg-gray-900" />,
  ssr: false,
});

const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => <div className="h-screen bg-gray-900" />,
  ssr: false,
});

const TechStack = dynamic(() => import("@/components/TechStack"), {
  loading: () => <div className="h-screen bg-gray-900" />,
  ssr: false,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="h-screen bg-gray-900" />,
  ssr: false,
});

export default function Home() {
  return (
    <>
      <SEO
        title="Your Name - Portfolio"
        description="Full Stack Developer specializing in modern web applications"
      />
      <main className="min-h-screen">
        <Suspense fallback={<div className="h-screen bg-gray-900" />}>
          <SpaceBackground />
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </main>
    </>
  );
}
