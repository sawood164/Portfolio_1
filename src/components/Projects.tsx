"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, ProjectCategory } from "@/types";
import Image from "next/image";
import { Card } from "./ui/Card";
import { ScrollReveal } from "./ScrollReveal";

const projects: Project[] = [
  {
    id: 1,
    title: "Trimrrr",
    description:
      "A  URL shortener with advanced analytics and user engagement.",
    image: "/projects/Trimrrr.png",
    category: "Web Apps",
    technologies: ["React.js", "Supabase", "Tailwind CSS", "Shadcn-UI"],
    githubUrl: "https://github.com/sawood164/trimrrr",
    liveUrl: "https://trimrrrr.vercel.app/",
  },
  {
    id: 2,
    title: "Flutter News App",
    description:
      "A News App to deliver a real-time news, providing users with up-to-date and relevant information.",
    image: "/projects/news.jpg",
    category: "Mobile Apps",
    technologies: ["Flutter", "Dart,", "JSON API"],
    githubUrl: "https://github.com/sawood164/Flutter-News",
  },
  {
    id: 3,
    title: "Task-Master App",
    description:
      "The app helps users organize their daily tasks efficiently with a unique priority-based system.",
    image: "/projects/Task.jpg",
    category: "Mobile Apps",
    technologies: ["Flutter", "Dart", "Firebase"],
    githubUrl: "https://github.com/sawood164/Task-master",
  },
];

const categories: ProjectCategory[] = ["All", "Web Apps", "Mobile Apps"];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section id="projects" className="pt-24 pb-20 px-4">
      <div className="container-width">
        <ScrollReveal>
          <h2 className="heading-lg gradient-text mb-8 text-center">
            Featured Projects
          </h2>
        </ScrollReveal>

        {/* Filter Buttons */}
        <ScrollReveal delay={0.2}>
          <motion.div className="mb-12 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`neo-button ${
                  activeCategory === category
                    ? "bg-blue-500"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={0.1 * (index + 1)}>
                <Card
                  hoverEffect="tilt"
                  className="group h-full transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-gray-400">{project.description}</p>

                    {/* Technologies */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex justify-between">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-400 hover:text-blue-300"
                          whileHover={{ x: 3 }}
                        >
                          View Code →
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-400 hover:text-blue-300"
                          whileHover={{ x: 3 }}
                        >
                          Live Demo →
                        </motion.a>
                      )}
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
