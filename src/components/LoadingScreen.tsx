"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  finishLoading: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ finishLoading }) => {
  useEffect(() => {
    // Simulate loading time (remove in production)
    setTimeout(finishLoading, 2000);
  }, [finishLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo or Name Animation */}
        <motion.div
          className="mb-8 text-4xl font-bold text-white md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Md Sawood Alam
          </span>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="h-0.5 w-48 overflow-hidden bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="mt-4 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading amazing things...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
