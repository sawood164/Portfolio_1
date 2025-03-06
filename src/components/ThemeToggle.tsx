"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed right-4 top-4 z-50 rounded-full bg-gray-800 p-3 text-white shadow-lg dark:bg-white dark:text-gray-800"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
    </motion.button>
  );
};

export default ThemeToggle;
