"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { Icon } from "./ui/Icon";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  User,
  Briefcase,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactInfo: React.FC<{
  icon: typeof Mail;
  title: string;
  content: string;
  href?: string;
}> = ({ icon, title, content, href }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.02, x: 5 }}
    className="group flex items-center gap-4 p-6 rounded-xl transition-all duration-300 hover:bg-white/5"
  >
    <div className="relative flex-shrink-0">
      <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md transform group-hover:scale-110 transition-transform duration-300" />
      <div className="relative rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 group-hover:from-blue-500/20 group-hover:to-purple-500/20">
        <Icon
          icon={icon}
          className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
          size={24}
        />
      </div>
    </div>
    <div>
      <h3 className="text-base font-medium text-gray-400 group-hover:text-gray-300">
        {title}
      </h3>
      <p className="text-lg text-white font-medium group-hover:text-blue-400 transition-colors duration-300">
        {content}
      </p>
    </div>
  </motion.a>
);

const InputField: React.FC<{
  icon: typeof User;
  placeholder: string;
  type?: string;
  textArea?: boolean;
  name: string;
  required?: boolean;
}> = ({ icon, placeholder, type = "text", textArea, name, required }) => (
  <div className="relative group">
    <div className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300">
      <Icon icon={icon} size={20} />
    </div>
    {textArea ? (
      <textarea
        name={name}
        required={required}
        className="w-full bg-white/5 rounded-xl border border-gray-800 py-4 px-12 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 min-h-[120px] resize-none"
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-white/5 rounded-xl border border-gray-800 py-4 px-12 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
        placeholder={placeholder}
      />
    )}
  </div>
);

const CosmicButton: React.FC<{
  isSubmitting: boolean;
}> = ({ isSubmitting }) => {
  return (
    <motion.button
      className="relative w-full overflow-hidden"
      whileHover="hover"
      whileTap="tap"
      disabled={isSubmitting}
    >
      {/* Main button container */}
      <motion.div
        className="relative z-10 py-4 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2"
        variants={{
          hover: {
            scale: 1.05,
            rotate: 3,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          tap: {
            scale: 0.95,
            rotate: -2,
          },
        }}
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <Send size={18} />
          </>
        )}

        {/* Inner glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-purple-400/50 to-blue-400/0"
          variants={{
            hover: {
              opacity: [0, 1, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              },
            },
          }}
          initial={{ opacity: 0 }}
        />
      </motion.div>

      {/* Cosmic dust particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          hover: {
            scale: 1.3,
            opacity: 1,
          },
        }}
        initial={{ scale: 0.8, opacity: 0 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white"
            variants={{
              hover: {
                scale: [1, 0],
                opacity: [0.5, 0],
                x: [0, i % 2 === 0 ? 100 : -100],
                y: [0, i < 2 ? -50 : i < 4 ? 0 : 50],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut",
                },
              },
            }}
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </motion.div>

      {/* Orbital rings */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          hover: {
            opacity: 1,
            scale: 1.2,
            transition: {
              duration: 0.3,
            },
          },
        }}
        initial={{ opacity: 0, scale: 0.8 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400/20"
          variants={{
            hover: {
              rotate: 360,
              transition: {
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              },
            },
          }}
          style={{ transform: "rotateX(75deg)" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-400/20"
          variants={{
            hover: {
              rotate: -360,
              transition: {
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              },
            },
          }}
          style={{ transform: "rotateX(75deg)" }}
        />
      </motion.div>

      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        variants={{
          hover: {
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            },
          },
        }}
        initial={{ opacity: 0, scale: 1 }}
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 130, 246, 0.5), transparent 70%)",
          filter: "blur(15px)",
        }}
      />
    </motion.button>
  );
};

// Fixed WarpStar component with consistent keyframe types
const WarpStar: React.FC<{ index: number }> = ({ index }) => {
  const randomX = Math.random() * window.innerWidth;
  const randomY = Math.random() * window.innerHeight;

  return (
    <motion.div
      className="absolute w-[2px] h-[2px] bg-white rounded-full"
      style={{
        top: randomY,
        left: randomX,
      }}
      animate={{
        opacity: [0, 0.5, 0],
        scale: [0, 1, 0],
        x: [0, -100],
      }}
      transition={{
        duration: 2,
        delay: index * 0.1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Galaxy Background Effect
const GalaxyBackground: React.FC = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 130, 246, 0.1), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      {Array.from({ length: 30 }).map((_, i) => (
        <WarpStar key={i} index={i} />
      ))}
    </motion.div>
  );
};

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        "124", // Service ID
        "template_6eiijps", // Template ID
        form,
        "7qnmFgp5sCAn_lTYD" // Public Key
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I will get back to you soon.",
      });
      form.reset();
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.section
          id="contact"
          className="relative min-h-screen pt-24 pb-20 px-4 perspective-1000"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GalaxyBackground />

          <div className="container-width relative">
            <ScrollReveal>
              <motion.div
                className="text-center max-w-3xl mx-auto mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                    Let's Talk
                  </span>
                </motion.div>
                <motion.h2
                  className="text-4xl md:text-5xl font-bold mt-6 mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Get In Touch
                </motion.h2>
                <motion.p
                  className="text-xl text-gray-400 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Have a project in mind? Let's discuss how we can work together
                  to bring your ideas to life.
                </motion.p>
              </motion.div>
            </ScrollReveal>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <ScrollReveal>
                  <motion.div
                    className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-800/50 backdrop-blur-xl border border-gray-700/30"
                    whileHover={{ scale: 1.01 }}
                  >
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <InputField
                          icon={User}
                          placeholder="Your Name"
                          name="user_name"
                          type="text"
                          required
                        />
                      </div>
                      <div>
                        <InputField
                          icon={Mail}
                          placeholder="Your Email"
                          type="email"
                          name="user_email"
                          required
                        />
                      </div>
                      <div>
                        <InputField
                          icon={Briefcase}
                          placeholder="Subject"
                          name="subject"
                          type="text"
                          required
                        />
                      </div>
                      <div>
                        <InputField
                          icon={MessageSquare}
                          placeholder="Your Message"
                          name="message"
                          textArea
                          required
                        />
                      </div>
                      <CosmicButton isSubmitting={isSubmitting} />

                      {/* Status Message */}
                      {submitStatus.type && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mt-4 text-center p-3 rounded-lg ${
                            submitStatus.type === "success"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {submitStatus.message}
                        </motion.div>
                      )}
                    </form>

                    {/* Decorative gradients */}
                    <div className="absolute -top-1 -right-1 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-1 -left-1 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                  </motion.div>
                </ScrollReveal>

                {/* Contact Information */}
                <ScrollReveal delay={0.2}>
                  <div className="lg:pl-12 space-y-8">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold text-white">
                        Contact Information
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        Feel free to reach out through any of these channels.
                        I'm always excited to connect and discuss potential
                        collaborations.
                      </p>
                    </div>

                    <div className="space-y-4 mt-8">
                      <ContactInfo
                        icon={Mail}
                        title="Email"
                        content="sawoodalam19@gmail.com"
                        href="mailto:sawoodalam19@gmail.com"
                      />
                      <ContactInfo
                        icon={Phone}
                        title="Phone"
                        content="+91-7004933954"
                        href="tel:+91-7004933954"
                      />
                      <ContactInfo
                        icon={MapPin}
                        title="Location"
                        content="Ranchi, Jharkhand, India"
                      />
                    </div>

                    {/* Additional decorative element to replace map */}
                    <motion.div
                      className="relative mt-12 p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 via-gray-800/20 to-gray-800/30 border border-gray-700/30"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="text-center">
                        <p className="text-gray-400 italic">
                          "Let's create something amazing together!"
                        </p>
                      </div>
                      <div className="absolute -top-1 -right-1 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
                      <div className="absolute -bottom-1 -left-1 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
                    </motion.div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* Background gradient animation */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(59, 130, 246, 0.1), transparent 70%)",
            }}
          />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Contact;
