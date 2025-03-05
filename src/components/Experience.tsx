"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineItem {
  id: number;
  title: string;
  company?: string;
  issuer?: string;
  date: string;
  description: string;
  type: "experience" | "certification";
  link?: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "MERN Stack Developer Intern",
    company: "Ethnus.",
    date: "August 2023 – November 2023",
    description:
      "As a frontend developer during my internship, my primary responsibilities included designing and developing responsive and user-friendly web interfaces using ReactJS.",
    type: "experience",
    link: "https://www.linkedin.com/in/md-sawood-alam-614884257/details/certifications/1711110076076/single-media-viewer/?profileId=ACoAAD9PtnABzNjCLv5SIVtv1zPE474tS7wNtWg",
  },
  {
    id: 2,
    title: "Associate Cloud Engineer",
    issuer: "Google Cloud",
    date: "2024",
    description:
      "Professional certification demonstrating expertise in designing distributed systems on Google.",
    type: "certification",
    link: "https://google.accredible.com/8d95aa5e-ded7-47b4-8be8-2cad80640cfe#acc.CRdryNnV",
  },
  {
    id: 3,
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    description:
      "Professional certification demonstrating expertise in designing distributed systems on AWS.",
    type: "certification",
    link: "https://www.credly.com/badges/c0917dc0-eab8-445e-a1b1-fe677674d0aa/public_url",
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="pt-24 pb-20 px-4">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Experience & Certifications
          </h2>
          <p className="mb-16 text-gray-400">
            My professional journey and achievements
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-500/20 md:left-1/2" />

          {/* Timeline items */}
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-12 flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div
                className={`relative ml-12 w-full md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pl-12" : "md:pr-12"
                }`}
              >
                {/* Dot */}
                <div className="absolute -left-[41px] h-5 w-5 rounded-full border-4 border-gray-900 bg-blue-500 md:left-auto md:right-0 md:translate-x-1/2">
                  <div className="absolute -inset-1 animate-ping rounded-full bg-blue-500 opacity-20" />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-lg bg-gray-800 p-6 shadow-lg"
                >
                  <span
                    className={`mb-2 inline-block rounded-full px-3 py-1 text-sm ${
                      item.type === "experience"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-purple-500/10 text-purple-400"
                    }`}
                  >
                    {item.type === "experience"
                      ? "Experience"
                      : "Certification"}
                  </span>
                  <h3 className="mb-1 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mb-2 text-sm text-gray-400">
                    {item.company || item.issuer} • {item.date}
                  </p>
                  <p className="text-gray-300">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300"
                    >
                      View Certificate →
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
