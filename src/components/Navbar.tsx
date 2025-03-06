"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "./ui/Link";
import { Icon } from "./ui/Icon";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  // Enhanced smooth scroll function with faster animation
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (!element) return;

    const navbar = document.querySelector("header");
    const navbarHeight = navbar?.getBoundingClientRect().height || 0;

    // Get the element's position relative to the viewport
    const rect = element.getBoundingClientRect();
    const absoluteElementTop = rect.top + window.pageYOffset;
    const middle = window.innerHeight / 2;
    const elementMiddle = rect.height / 2;

    // Calculate the scroll position that will center the section
    const offsetPosition =
      absoluteElementTop - navbarHeight - (middle - elementMiddle);

    // Faster, smoother scrolling animation
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 600; // Fast but smooth
    let start: number | null = null;

    function animation(currentTime: number) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      // Enhanced easing function
      const easeOutQuart = (x: number): number => {
        return 1 - Math.pow(1 - x, 4);
      };

      window.scrollTo(0, startPosition + distance * easeOutQuart(progress));

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }, []);

  // More precise active section detection
  const handleScroll = useCallback(() => {
    const navbar = document.querySelector("header");
    const navbarHeight = navbar?.getBoundingClientRect().height || 0;
    const scrollPosition = window.pageYOffset;
    const viewportHeight = window.innerHeight;

    // Get all sections with their positions
    const sections = navItems
      .map((item) => {
        const element = document.getElementById(item.href.replace("#", ""));
        if (!element) return null;

        const rect = element.getBoundingClientRect();
        const offsetTop = rect.top + window.pageYOffset - navbarHeight;

        return {
          id: item.href.replace("#", ""),
          offset: offsetTop,
          height: rect.height,
        };
      })
      .filter(Boolean);

    // Find the current section using improved detection
    const currentSection =
      sections.reduce(
        (acc, section) => {
          if (!section) return acc;

          const sectionMiddle = section.offset + section.height / 2;
          const viewportMiddle = scrollPosition + viewportHeight / 2;

          // Calculate how close the section is to the middle of the viewport
          const distanceFromMiddle = Math.abs(viewportMiddle - sectionMiddle);

          if (!acc.id || distanceFromMiddle < acc.distance) {
            return {
              id: section.id,
              distance: distanceFromMiddle,
            };
          }
          return acc;
        },
        { id: "", distance: Infinity }
      ).id || "home";

    setActiveSection(currentSection);
  }, []);

  // Update scroll listener with debouncing for better performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", debouncedScroll);
    handleScroll(); // Initial check

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [handleScroll]);

  // Navbar background transition
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isScrolled ? "bg-gray-900/80 backdrop-blur-md" : "bg-transparent"
        }`}
      />

      {/* Content */}
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.a
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#home");
          }}
          href="#home"
          className="text-gradient-animate text-xl font-bold cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Portfolio
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-1 md:flex lg:space-x-2">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={`relative px-3 py-2 text-sm font-medium transition-colors lg:px-4 cursor-pointer ${
                activeSection === item.href.replace("#", "")
                  ? "text-blue-400"
                  : "text-gray-300 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              {activeSection === item.href.replace("#", "") && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-400"
                  layoutId="navbar-underline"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="relative z-50 rounded-lg p-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <Icon
            icon={isOpen ? X : Menu}
            className="text-white"
            size={24}
            animated={false}
          />
        </motion.button>

        {/* Mobile Navigation */}
        <motion.div
          className={`fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-lg md:hidden ${
            isOpen ? "block" : "hidden"
          }`}
          initial={{ opacity: 0, x: "100%" }}
          animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
        >
          <div className="flex min-h-screen flex-col items-center justify-center space-y-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={`text-2xl font-medium ${
                  activeSection === item.href.replace("#", "")
                    ? "text-blue-400"
                    : "text-gray-300"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
